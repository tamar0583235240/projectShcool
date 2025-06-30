# School Management System - Backend

מערכת ניהול בית ספר מבוססת Node.js + TypeScript + MongoDB

## תכונות

- 👨‍🎓 ניהול תלמידים
- 👩‍🏫 ניהול מורים  
- 📊 ניהול ציונים
- 🔐 מערכת אימות (JWT)
- 📈 דוחות וסטטיסטיקות
- ✅ Validation מלא
- 🛡️ אבטחה מתקדמת

## התקנה

### דרישות מוקדמות
- Node.js (גרסה 18+)
- MongoDB (מקומי או Atlas)
- npm או yarn

### שלבי התקנה

1. **Clone הפרויקט**
```bash
git clone <repository-url>
cd school-management-backend
```

2. **התקנת חבילות**
```bash
npm install
```

3. **הגדרת משתני סביבה**
```bash
cp .env.example .env
```

ערוך את קובץ `.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/school_management
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

4. **בניית הפרויקט**
```bash
npm run build
```

5. **הרצת MongoDB**
```bash
# אם אתה משתמש ב-MongoDB מקומי
mongod
```

6. **איכלוס בסיס הנתונים**
```bash
npm run seed
```

7. **הרצת השרת**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

השרת יעלה על: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/student/login` - התחברות תלמיד
- `POST /api/auth/teacher/login` - התחברות מורה

### Students
- `GET /api/students` - קבלת כל התלמידים
- `GET /api/students/:id` - קבלת תלמיד לפי ID
- `GET /api/students/grade/:grade` - קבלת תלמידים לפי כיתה
- `POST /api/students` - יצירת תלמיד חדש
- `PUT /api/students/:id` - עדכון תלמיד
- `DELETE /api/students/:id` - מחיקת תלמיד

### Teachers
- `GET /api/teachers` - קבלת כל המורים
- `GET /api/teachers/:id` - קבלת מורה לפי ID
- `GET /api/teachers/class/:class` - קבלת מורה לפי כיתה
- `POST /api/teachers` - יצירת מורה חדש
- `PUT /api/teachers/:id` - עדכון מורה
- `DELETE /api/teachers/:id` - מחיקת מורה

### Grades
- `GET /api/grades` - קבלת כל הציונים
- `GET /api/grades/student/:studentId` - ציונים לפי תלמיד
- `GET /api/grades/subject/:subject` - ציונים לפי מקצוע
- `GET /api/grades/report/:studentId` - תעודה של תלמיד (כולל ממוצע)
- `GET /api/grades/statistics/:subject` - סטטיסטיקות מקצוע
- `POST /api/grades` - הוספת ציון חדש
- `PUT /api/grades/:id` - עדכון ציון
- `DELETE /api/grades/:id` - מחיקת ציון

### Health Check
- `GET /api/health` - בדיקת תקינות השרת

## פרטי התחברות לדוגמה

### תלמידים:
```
ID: ST001, Password: student123
ID: ST002, Password: student456
ID: ST003, Password: student789
ID: ST004, Password: student101
```

### מורים:
```
ID: 1, Password: teacher123
ID: 2, Password: teacher456
ID: 3, Password: teacher789
ID: 4, Password: teacher101
```

## דוגמאות שימוש

### התחברות תלמיד
```bash
curl -X POST http://localhost:3000/api/auth/student/login \
  -H "Content-Type: application/json" \
  -d '{"id": "ST001", "password": "student123"}'
```

### יצירת תלמיד חדש
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "id": "ST999",
    "name": "שם חדש",
    "age": 12,
    "phone": "050-1234567",
    "grade": "ו'\''",
    "address": {
      "city": "תל אביב",
      "street": "דיזנגוף",  
      "building": "100",
      "apartment": "1"
    },
    "password": "newpassword"
  }'
```

### קבלת דוח תלמיד
```bash
curl http://localhost:3000/api/grades/report/ST001
```

## מבנה הפרויקט

```
src/
├── controllers/     # Controllers לטיפול בבקשות
├── middleware/      # Middleware לאימות ו-validation
├── models/         # Mongoose models
├── routes/         # הגדרת routes
├── database/       # חיבור למסד נתונים
├── app.ts          # הגדרת Express app
├── index.ts        # נקודת כניסה לאפליקציה
└── seed.ts         # Script לאיכלוס הנתונים
```

## Scripts זמינים

- `npm run dev` - הרצה במצב development עם nodemon
- `npm run build` - בניית הפרויקט ל-JavaScript
- `npm start` - הרצת השרת המובנה
- `npm run seed` - איכלוס בסיס הנתונים בנתוני דוגמה

## אבטחה

- 🔐 הצפנת סיסמאות עם bcrypt
- 🎫 JWT tokens לאימות
- 🛡️ Helmet לאבטחת headers
- ✅ Input validation עם express-validator
- 🚫 CORS protection

## פיתוח נוסף

לצורך פיתוח נוסף, ניתן להוסיף:
- Rate limiting
- Request logging מתקדם
- Email notifications
- File upload לתמונות
- Real-time updates עם Socket.IO
- Admin dashboard
- Backup system

## תמיכה

לתמיכה נוספת או שאלות, צרו קשר דרך GitHub Issues.