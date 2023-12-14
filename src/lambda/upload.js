const AWS = require('aws-sdk');

// Create an S3 instance
const s3 = new AWS.S3({
    maxRetries: 0,
    region: 'us-west-2',
});

exports.handler = async (event) => {
 try {
    // Check if the event has a body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*', // Update with your allowed origins
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'OPTIONS, POST',
        },
        body: JSON.stringify({ message: 'Missing image data in the request body' }),
      };
    }

    // Retrieve the base64-encoded image data from the event
    const base64Image = event.body;

    // Decode the base64-encoded image data
    const binaryImageData = Buffer.from(base64Image, 'base64');

        // Log the decoded image data (for debugging purposes)
        console.log('Decoded Image Data:', binaryImageData.toString('base64'));


    // Set the desired file name (generate a unique name)
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileName = `uploads/${timestamp}-${randomString}.png`;

    // Set the S3 bucket name
    const bucketName = '2110-images';

    // Set the S3 object key (file path)
    const s3ObjectKey = fileName;

    // Determine the content type based on the file extension
    let contentType = 'image/png'; // Default to PNG
    const fileExtension = fileName.split('.').pop();
    if (fileExtension.toLowerCase() === 'jpg' || fileExtension.toLowerCase() === 'jpeg') {
      contentType = 'image/jpeg';
    }  // Upload the file to S3
    await s3
      .putObject({
        Bucket: bucketName,
        Key: s3ObjectKey,
        Body: binaryImageData,
        ContentType: contentType,
      })
      .promise();

    // Return a successful response with CORS headers
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Update with your allowed origins
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      },
      body: JSON.stringify({ message: 'File uploaded successfully' }),
    };
  } catch (error) {
    console.error('Error uploading file:', error);

    // Return an error response with CORS headers
    return {
      statusCode: 500,

      headers: {
        'Access-Control-Allow-Origin': '*', // Update with your allowed origins
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
      },
      body: JSON.stringify({ message: 'Error uploading file' }),
    };
  }
};