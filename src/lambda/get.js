const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    const bucketName = '2110-images';
    const folderName = 'uploads';

    try {
        // List objects in the specified S3 bucket and folder
        const listObjectsParams = {
            Bucket: bucketName,
            Prefix: `${folderName}/`,
        };

        const s3Objects = await s3.listObjectsV2(listObjectsParams).promise();

        // Retrieve each PNG image and convert to Base64
        const imagePromises = s3Objects.Contents.filter((object) =>
            object.Key.toLowerCase().endsWith('.png')
        ).map(async (image) => {
            const getObjectParams = {
                Bucket: bucketName,
                Key: image.Key,
            };

            const imageObject = await s3.getObject(getObjectParams).promise();
            const base64Image = imageObject.Body.toString('base64');
            return {
                key: image.Key,
                data: base64Image,
            };
        });

       // Wait for all image promises to resolve
        const images = await Promise.all(imagePromises);

        // Log the keys of  images.forEach((image) => console.log('Image Key:', image.key));

        // Return the list of images (keys and data) in the response
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Replace * with the actual origin of your React app in production
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
            body: JSON.stringify({
                message: 'Images retrieved successfully!',
                images,
            }),
        };

        return response;
    } catch (error) {
        console.error('Error:', error);
        const response = {
            statusCode: 500,
            body: JSON.stringify('Error retrieving images from S3'),
        };
        return response;
    }
};