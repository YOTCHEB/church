# Available Images in Jehovah Jireh Ministry

## Staff Images
Located in: `frontend/img/photos/`

1. **coordinator.png** - Coordinator profile image
2. **vice _president.jpeg** - Vice Coordinator profile image  
3. **secre.jpeg** - Secretary profile image
4. **tressure.jpeg** - Treasurer profile image

## Program Images
Located in: `frontend/img/photos/`

1. **1768200744111.jpg** - Housing Support program
2. **1768200744123.jpg** - Food Distribution program
3. **1768200744137.jpg** - Education Support program
4. **1768200744159.jpg** - Healthcare Ministry program
5. **1768200744172.jpg** - Spiritual Guidance program
6. **1768200744183.jpg** - Community Empowerment program
7. **1768200744192.jpg** - Additional program image
8. **1768200744202.jpg** - Additional program image
9. **1768200744211.jpg** - Additional program image
10. **1768200744222.jpg** - Additional program image
11. **1768200744234.jpg** - Additional program image
12. **1768200744250.jpg** - Additional program image
13. **1768200744262.jpg** - Additional program image
14. **1768200744273.jpg** - Additional program image
15. **1768200744284.jpg** - Additional program image
16. **1768200744300.jpg** - Additional program image
17. **1768200744316.jpg** - Additional program image

## Usage

### In Admin Dashboard
When adding staff or programs, use these paths:
- Staff: `img/photos/coordinator.png`, `img/photos/vice _president.jpeg`, etc.
- Programs: `img/photos/1768200744111.jpg`, `img/photos/1768200744123.jpg`, etc.

### In Code
```javascript
// Staff image
<img src="img/photos/coordinator.png" alt="Coordinator" />

// Program image  
<img src="img/photos/1768200744111.jpg" alt="Housing Support" />
```

### In Supabase Database
When inserting data via SQL or the admin dashboard:
```sql
INSERT INTO staff (name, image_url, ...) 
VALUES ('John Doe', 'img/photos/coordinator.png', ...);

INSERT INTO programs (title, image_url, ...) 
VALUES ('Housing Support', 'img/photos/1768200744111.jpg', ...);
```

## Adding New Images

1. Place new images in `frontend/img/photos/` folder
2. Use the filename as the image_url value (e.g., `img/photos/your-image.jpg`)
3. Images will be automatically available in the app

## Notes
- All images are served from the `frontend/img/photos/` directory
- Supported formats: JPG, JPEG, PNG, WEBP, GIF
- Recommended size for staff photos: 400x500px (4:5 aspect ratio)
- Recommended size for program photos: 800x600px (4:3 aspect ratio)
