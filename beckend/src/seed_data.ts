import connectDB from './config/database_connection';
import { Student } from './models/models_student';
import { Teacher } from './models/models_teacher';
import { Grade } from './models/models_grade';
import bcrypt from 'bcryptjs';

const seedStudents = [
  {
    id: "ST001",
    name: "אביגיל רוזן",
    age: 12,
    phone: "052-1234567",
    grade: "ו'",
    address: {
      city: "רמת גן",
      street: "בילו",
      building: "8",
      apartment: "15"
    },
    password: "student123"
  },
  {
    id: "ST002", 
    name: "יונתן שמעון",
    age: 11,
    phone: "054-2345678",
    grade: "ה'",
    address: {
      city: "גבעתיים",
      street: "קטמון",
      building: "12",
      apartment: "4"
    },
    password: "student456"
  },
  {
    id: "ST003",
    name: "תמר אברהם",
    age: 13,
    phone: "050-3456789",
    grade: "ז'",
    address: {
      city: "הרצליה",
      street: "סוקולוב",
      building: "6",
      apartment: "9"
    },
    password: "student789"
  },
  {
    id: "ST004",
    name: "דניאל כהן",
    age: 10,
    phone: "053-4567890",
    grade: "ד'",
    address: {
      city: "כפר סבא",
      street: "וייצמן",
      building: "20",
      apartment: "2"
    },
    password: "student101"
  },
  {
    id: "ST005",
    name: "רות לביא",
    age: 12,
    phone: "058-5678901",
    grade: "ו'",
    address: {
      city: "ראשון לציון",
      street: "הרצל",
      building: "14",
      apartment: "7"
    },
    password: "student202"
  },
  {
    id: "ST006",
    name: "עמית ברק",
    age: 14,
    phone: "059-6789012",
    grade: "ח'",
    address: {
      city: "חולון",
      street: "סוקולוב",
      building: "3",
      apartment: "11"
    },
    password: "student303"
  },
  {
    id: "ST007",
    name: "מיכל דוד",
    age: 11,
    phone: "050-7890123",
    grade: "ה'",
    address: {
      city: "בת ים",
      street: "בן גוריון",
      building: "18",
      apartment: "5"
    },
    password: "student404"
  },
  {
    id: "ST008",
    name: "אליעזר מלכא",
    age: 13,
    phone: "052-8901234",
    grade: "ז'",
    address: {
      city: "לוד",
      street: "הנביאים",
      building: "9",
      apartment: "13"
    },
    password: "student505"
  }
];

const seedTeachers = [
  {
    id: 1,
    tz: "123456789",
    firstName: "מרים",
    lastName: "גולדברג",
    class: "א'",
    phone: "050-1111111",
    address: {
      city: "תל אביב",
      street: "דיזנגוף",
      building: "45",
      apartment: "12"
    },
    password: "teacher123"
  },
  {
    id: 2,
    tz: "234567890",
    firstName: "יוסף",
    lastName: "אברמוביץ",
    class: "ב'",
    phone: "052-2222222",
    address: {
      city: "חיפה",
      street: "הרצל",
      building: "23",
      apartment: "8"
    },
    password: "teacher456"
  },
  {
    id: 3,
    tz: "345678901",
    firstName: "שושנה",
    lastName: "כץ",
    class: "ג'",
    phone: "054-3333333",
    address: {
      city: "ירושלים",
      street: "יפו",
      building: "67",
      apartment: "3"
    },
    password: "teacher789"
  },
  {
    id: 4,
    tz: "456789012",
    firstName: "אברהם",
    lastName: "שפירא",
    class: "ד'",
    phone: "053-4444444",
    address: {
      city: "באר שבע",
      street: "רינגלבלום",
      building: "31",
      apartment: "6"
    },
    password: "teacher101"
  },
  {
    id: 5,
    tz: "567890123",
    firstName: "רבקה",
    lastName: "מזרחי",
    class: "ה'",
    phone: "058-5555555",
    address: {
      city: "אשקלון",
      street: "ניצנה",
      building: "14",
      apartment: "10"
    },
    password: "teacher202"
  },
  {
    id: 6,
    tz: "678901234",
    firstName: "משה",
    lastName: "לוי",
    class: "ו'",
    phone: "059-6666666",
    address: {
      city: "נתניה",
      street: "הרב קוק",
      building: "52",
      apartment: "4"
    },
    password: "teacher303"
  }
];

const seedGrades = [
  // ST001 - אביגיל רוזן
  { studentId: "ST001", subject: "מתמטיקה", score: 94 },
  { studentId: "ST001", subject: "אנגלית", score: 87 },
  { studentId: "ST001", subject: "מדעים", score: 91 },
  { studentId: "ST001", subject: "ספרות", score: 89 },

  // ST002 - יונתן שמעון  
  { studentId: "ST002", subject: "מתמטיקה", score: 78 },
  { studentId: "ST002", subject: "אנגלית", score: 82 },
  { studentId: "ST002", subject: "גאוגרפיה", score: 85 },
  { studentId: "ST002", subject: "היסטוריה", score: 77 },

  // ST003 - תמר אברהם
  { studentId: "ST003", subject: "מתמטיקה", score: 96 },
  { studentId: "ST003", subject: "אנגלית", score: 93 },
  { studentId: "ST003", subject: "פיזיקה", score: 88 },
  { studentId: "ST003", subject: "כימיה", score: 92 },

  // ST004 - דניאל כהן
  { studentId: "ST004", subject: "מתמטיקה", score: 65 },
  { studentId: "ST004", subject: "אנגלית", score: 71 },
  { studentId: "ST004", subject: "מחשבים", score: 85 },
  { studentId: "ST004", subject: "אומנות", score: 88 },

  // ST005 - רות לביא
  { studentId: "ST005", subject: "מתמטיקה", score: 83 },
  { studentId: "ST005", subject: "אנגלית", score: 79 },
  { studentId: "ST005", subject: "ביולוגיה", score: 86 },
  { studentId: "ST005", subject: "לשון", score: 81 },

  // ST006 - עמית ברק
  { studentId: "ST006", subject: "מתמטיקה", score: 72 },
  { studentId: "ST006", subject: "אנגלית", score: 68 },
  { studentId: "ST006", subject: "היסטוריה", score: 75 },
  { studentId: "ST006", subject: "אזרחות", score: 73 },

  // ST007 - מיכל דוד
  { studentId: "ST007", subject: "מתמטיקה", score: 90 },
  { studentId: "ST007", subject: "אנגלית", score: 86 },
  { studentId: "ST007", subject: "מוזיקה", score: 95 },
  { studentId: "ST007", subject: "ספורט", score: 92 },

  // ST008 - אליעזר מלכא
  { studentId: "ST008", subject: "מתמטיקה", score: 58 },
  { studentId: "ST008", subject: "אנגלית", score: 62 },
  { studentId: "ST008", subject: "מדעים", score: 67 },
  { studentId: "ST008", subject: "תנך", score: 84 }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Grade.deleteMany({});

    // Hash passwords and create students
    console.log('👨‍🎓 Creating students...');
    const studentsWithHashedPasswords = await Promise.all(
      seedStudents.map(async (student) => ({
        ...student,
        password: await bcrypt.hash(student.password, 10)
      }))
    );
    await Student.insertMany(studentsWithHashedPasswords);

    // Hash passwords and create teachers
    console.log('👩‍🏫 Creating teachers...');
    const teachersWithHashedPasswords = await Promise.all(
      seedTeachers.map(async (teacher) => ({
        ...teacher,
        password: await bcrypt.hash(teacher.password, 10)
      }))
    );
    await Teacher.insertMany(teachersWithHashedPasswords);

    // Create grades
    console.log('📊 Creating grades...');
    await Grade.insertMany(seedGrades);

    console.log('✅ Database seeding completed successfully!');
    console.log(`📈 Created: ${seedStudents.length} students, ${seedTeachers.length} teachers, ${seedGrades.length} grades`);
    
    console.log('\n🔐 Login credentials:');
    console.log('Students:');
    seedStudents.forEach(student => {
      console.log(`  ID: ${student.id}, Password: ${student.password}`);
    });
    console.log('\nTeachers:');
    seedTeachers.forEach(teacher => {
      console.log(`  ID: ${teacher.id}, Password: ${teacher.password}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // await disconnectDB();
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };