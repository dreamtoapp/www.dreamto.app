# Cloudinary Setup Guide

## 🚨 Current Issue
The "Show More" functionality on the worksample page is getting stuck because Cloudinary is not properly configured. This causes API calls to fail silently, making the page hang.

## 🔧 Solution

### 1. Create Environment File
Create a `.env.local` file in your project root with the following variables:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

### 2. Get Cloudinary Credentials

1. **Sign up/Login** to [Cloudinary](https://cloudinary.com/)
2. **Go to Dashboard** → [Console](https://cloudinary.com/console)
3. **Copy your credentials**:
   - Cloud Name
   - API Key
   - API Secret

### 3. Upload Your Images

1. **Create folders** in Cloudinary with this structure:
   ```
   dreamToApp/
   └── workSample/
       ├── flyer/
       ├── coverage/
       ├── cnc/
       └── character/
   ```

2. **Upload images** to each folder
3. **Tag cover images** with "cover" tag for better display

### 4. Restart Development Server

```bash
npm run dev
```

## ✅ Verification

After setup, you should see:
- ✅ No console errors about missing environment variables
- ✅ Fast loading of worksample page
- ✅ "Show More" buttons work without getting stuck
- ✅ Images load properly in galleries

## 🐛 Troubleshooting

If you still see issues:

1. **Check console logs** for Cloudinary errors
2. **Verify environment variables** are loaded correctly
3. **Ensure images exist** in the correct Cloudinary folders
4. **Check network tab** for failed API requests

## 📁 Expected Folder Structure in Cloudinary

```
dreamToApp/
└── workSample/
    ├── flyer/
    │   ├── image1.jpg
    │   ├── image2.jpg
    │   └── ...
    ├── coverage/
    │   ├── image1.jpg
    │   └── ...
    ├── cnc/
    │   ├── image1.jpg
    │   └── ...
    └── character/
        ├── image1.jpg
        └── ...
``` 