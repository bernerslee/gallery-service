# CRUD API for SDC (Gallery Service)

This is an api built for the Gallery Service of the SDC project. For this project, a MySQL database is being used which allows
the user to get, create, update and delete data. 


# CRUD enpoints
----
- GET `gallery/:id` 
  - Will return json data with the photos of the house corresponding to the specific id entered by the user
  - Success Response:
    - Status Code: 200
    - Content:
    
      ``` javascript
       [ 
        { "img_url": "https://s3-us-west-1.amazonaws.com/zillowgallerydata/apartment-323780.jpg", "img_order": 0 },
        { "img_url": "https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed1.jpg", "img_order": 1 },
        { "img_url": "https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed2.jpg", "img_order": 2 },
        { "img_url": "https://s3-us-west-1.amazonaws.com/zillowgallerydata/bed3.jpeg", "img_order": 3 },
        { "img_url": "https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath1.jpeg", "img_order": 4 },
        { "img_url": "https://s3-us-west-1.amazonaws.com/zillowgallerydata/bath2.jpg", "img_order": 5 },
        { "img_url": "https://s3-us-west-1.amazonaws.com/zillowgallerydata/diningRoom.jpg", "img_order": 6 },
        { "img_url": "https://s3-us-west-1.amazonaws.com/zillowgallerydata/kitchen.jpg", "img_order": 7 },
        { "img_url": "https://s3-us-west-1.amazonaws.com/zillowgallerydata/livingRoom.jpg", "img_order": 8 },
        { "img_url": "https://s3-us-west-1.amazonaws.com/zillowgallerydata/backyard.jpg", "img_order": 9 } 
      ]`
      
  - Example Call:    
       ```javascript
          $.ajax({
            url: "/gallery/10",
            dataType: "json",
            type : "GET",
            success : function(data) {
              console.log(data);
            }
          });
      
- POST `gallery/` 
  - Will create and insert a new video document with an incrementing ID into the database
  - Success Response:
    - Status Code: 200
  - Request Body (example):
    ``` javascript
      {
      "img_0":"test_url",
      "img_1":"test_url",
      "img_2":"test_url",
      "img_3":"test_url",
      "img_4":"test_url",
      "img_5":"test_url",
      "img_6":"test_url",
      "img_7":"test_url",
      "img_8":"test_url",
      "img_9":"test_url"
     }
  - Example Call
       ``` javascript
        $.ajax({
          url: "/gallery",
          type : "POST",
          dataType: "json",
          data: `{
              "img_0":"test_url",
              "img_1":"test_url",
              "img_2":"test_url",
              "img_3":"test_url",
              "img_4":"test_url",
              "img_5":"test_url",
              "img_6":"test_url",
              "img_7":"test_url",
              "img_8":"test_url",
              "img_9":"test_url"
          }`,
          success : function(data) {
          console.log("This is the data", data);
          }
        });
        
 - PUT `gallery/:id`
    - Will update a record with the id provided by the user
    - Success Response:
      - Status Code: 200
    - Example Call
       ``` javascript
        $.ajax({
          url: "/gallery/10",
          type : "PUT",
          dataType: "json",
          success : function(data) {
           console.log("This is the data", data);
          }
        });
        
  - DELETE `gallery/:id`
    - Will delete a record with the id provided by the user
    - Success Response:
      - Status Code: 200
    - Example Call
       ``` javascript
        $.ajax({
          url: "/gallery/10",
          type : "DELETE",
          dataType: "json",
          success : function(data) {
           console.log("This is the data", data);
          }
        });
  
  