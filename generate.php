<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $race = $_POST['race'];
    $gender = $_POST['gender'];
    $class = $_POST['class'];

    // Replicate API details
    $replicate_api_url = 'https://api.replicate.com/v1/predictions';
    $replicate_api_key = 'r8_KWlhJ6yi94yafcT8Hdof5eWJf5zGzMf3WzcA1';  // Use your API key here
    $model_version_id = 'meta/meta-llama-3-70b-instruct';  // The model you are using

    // Prepare the data to send to Replicate API
    $data = [
        'version' => $model_version_id,
        'input' => [
            'race' => $race,
            'gender' => $gender,
            'class' => $class
        ]
    ];

    // Initialize cURL
    $ch = curl_init($replicate_api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $replicate_api_key,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    // Execute the API request and get the response
    $response = curl_exec($ch);
    if(curl_errno($ch)) {
        echo 'Curl error: ' . curl_error($ch);
    }
    curl_close($ch);

    // Decode the API response
    $result = json_decode($response, true);

    // Extract the generated name from the API response
    if (isset($result['output'])) {
        $generated_name = $result['output'];  // Adjust based on how your model returns the name
    } else {
        $generated_name = "Failed to generate a name.";
    }

    // Redirect back to the form with the generated name as a query parameter
    header("Location: index.php?name=" . urlencode($generated_name));
    exit();
} else {
    // If the request is not POST, redirect to the form page
    header("Location: index.php");
    exit();
}
