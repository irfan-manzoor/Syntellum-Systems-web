<?php
/**
 * Syntellum Systems - Enterprise Contact Handler
 * Hostinger LiteSpeed / Apache Production Endpoint
 * Recipient: info@syntellum.si
 */

// Strict JSON responses
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Reject non-POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. POST is required.'
    ]);
    exit;
}

// Read raw JSON or form-encoded POST
$rawInput = file_get_contents('php://input');
$data = [];

if (!empty($rawInput)) {
    $decoded = json_decode($rawInput, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $data = $decoded;
    }
}

if (empty($data) && !empty($_POST)) {
    $data = $_POST;
}

// Honeypot spam prevention
if (!empty($data['hp_field']) || !empty($data['website_url'])) {
    // Silently succeed to fool bot harvesters
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been received.'
    ]);
    exit;
}

// Extract and sanitize fields
$name = isset($data['name']) ? trim(strip_tags((string)$data['name'])) : '';
$email = isset($data['email']) ? trim((string)$data['email']) : '';
$company = isset($data['company']) ? trim(strip_tags((string)$data['company'])) : '';
$role = isset($data['role']) ? trim(strip_tags((string)$data['role'])) : '';
$interest = isset($data['interest']) ? trim(strip_tags((string)$data['interest'])) : '';
$message = isset($data['message']) ? trim(strip_tags((string)$data['message'])) : '';

$errors = [];

// Validation
if (empty($name) || mb_strlen($name) < 2) {
    $errors['name'] = 'Please provide your full name.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please provide a valid business email address.';
} else {
    // Header injection prevention
    if (preg_match("/[\r\n]/", $email)) {
        $errors['email'] = 'Invalid email format.';
    }
}

if (empty($company) || mb_strlen($company) < 2) {
    $errors['company'] = 'Please provide your organisation name.';
}

if (empty($message) || mb_strlen($message) < 10) {
    $errors['message'] = 'Please provide a brief outline of your enquiry or project scope.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed. Please review the highlighted fields.',
        'errors' => $errors
    ]);
    exit;
}

// Email recipient & headers
$to = 'info@syntellum.si';
$subject = 'Syntellum Systems Enquiry: ' . substr($name, 0, 50) . ' (' . substr($company, 0, 50) . ')';

// Sanitize subject against CR/LF injection
$cleanSubject = str_replace(["\r", "\n"], ' ', $subject);

// Standard sender envelope
$fromAddress = 'noreply@syntellum.si';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Syntellum Systems Website <' . $fromAddress . '>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: Syntellum PHP Mailer/2.0';

// Structured body
$bodyLines = [
    "===========================================================",
    "SYNTELLUM SYSTEMS - NEW STRATEGIC BUSINESS ENQUIRY",
    "===========================================================",
    "",
    "Timestamp: " . gmdate('Y-m-d H:i:s') . " UTC",
    "Client Name: " . $name,
    "Business Email: " . $email,
    "Organisation: " . $company,
    "Role / Function: " . (!empty($role) ? $role : 'Not specified'),
    "Capability Interest: " . (!empty($interest) ? $interest : 'General Enquiry'),
    "",
    "-----------------------------------------------------------",
    "PROJECT OVERVIEW / CHALLENGE DETAILS:",
    "-----------------------------------------------------------",
    $message,
    "",
    "===========================================================",
    "Received via syntellum.si contact endpoint.",
    "==========================================================="
];

$emailBody = implode("\r\n", $bodyLines);

// Attempt mail transport dispatch
$mailSent = @mail($to, $cleanSubject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for reaching out to Syntellum Systems. We have received your brief and will review your requirements with our leadership team promptly.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'The message could not be sent due to a temporary server mail issue. Please reach us directly at info@syntellum.si.'
    ]);
}
