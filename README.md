# TasksHub 📋

**Mobile Application Development - Practical Tutorial 07**
Persistent Storage & Local Notifications
Department of Statistics & Computer Science, University of Kelaniya
Academic Year 2024/2025 (Semester 2)

**Student Name:** [U.K.R.Bhagya]
**Student ID:** [PS//2022/229]

---

## 📖 About the Project

TasksHub is a simple task management mobile application built with **React Native** and **Expo**. In this lab session, I learned how to store data permanently on the device, send local notifications, and let users pick images from their phone gallery.

The app lets users add tasks, view them on a dashboard, and manage a student profile with a profile picture. All data stays on the device even after the app is closed.

---

## 🎯 What I Learned

1. The difference between component state (`useState`) and persistent storage (`AsyncStorage`)
2. Storing, retrieving, and clearing object arrays using `JSON.stringify()` and `JSON.parse()`
3. Building hybrid file-based navigation (Tabs + Stack) with Expo Router
4. Triggering local notifications with `expo-notifications`
5. Picking images from the device gallery with `expo-image-picker`

---

## ✨ Features

### 🏠 Dashboard
- Displays all saved tasks in a scrollable list
- Uses `useFocusEffect` so the list refreshes every time the user returns to the screen
- Shows a friendly message when there are no tasks
- "+ Add New Task" button opens the Add Task screen

### ➕ Add Task (Modal Screen)
- Input fields for task name and a multiline description
- Validates empty fields and shows an error alert
- Saves the new task into `AsyncStorage` as a stringified array
- Sends an instant local notification when the task is saved
- Uses `ImageBackground` and an image banner for the UI

### 👤 Profile
- Stores Student Name and Student ID
- Picks a profile photo from the gallery (with permission handling, square crop)
- Saves profile details to `AsyncStorage`
- "Clear" button wipes all locally stored data

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| React Native + Expo | Mobile app framework |
| Expo Router | File-based navigation (Tabs + Stack) |
| `@react-native-async-storage/async-storage` | Persistent local storage |
| `expo-notifications` | Local notifications |
| `expo-image-picker` | Selecting images from the gallery |
| `@expo/vector-icons` | Tab bar icons (MaterialCommunityIcons) |
| TypeScript | Type-safe code |

---

## 📁 Project Structure

```
TasksHub/
├── app/
│   ├── _layout.tsx        # Root layout (Stack + notification handler)
│   ├── add-task.tsx       # Add Task modal screen (writes data)
│   └── (tabs)/
│       ├── _layout.tsx    # Bottom tab bar setup
│       ├── index.tsx      # Dashboard (reads data)
│       └── profile.tsx    # Profile (image picker + clear data)
├── Output_Screens/        # Screenshots of the running app
└── README.md
```

---

## 🚀 How to Run

1. Clone the repository
   ```bash
   git clone [https://github.com/rambo200211/TasksHub.git]
   cd TasksHub
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npx expo start
   ```
4. Scan the QR code using the **Expo Go** app on your phone, or press `a` to open an Android emulator.

---

## 📸 Output Screenshots

All screenshots are saved in the `Output_Screens` folder, including:

- Empty Dashboard
- Add Task screen with validation error
- Task saved and notification displayed
- Dashboard showing saved tasks
- Profile screen with **image picker proof**
- Profile saved successfully

---

## 💡 Key Concepts Summary

- **`AsyncStorage`** stores only strings, so arrays and objects must be converted using `JSON.stringify()` before saving and `JSON.parse()` after reading.
- **`useFocusEffect`** runs every time a screen comes into focus, unlike `useEffect`, which runs only once on mount.
- **Local notifications** are triggered by the app itself on the device, unlike push notifications, which come from a remote server.
- **Permissions** must be requested before accessing the user's photo library.

---

## 👨‍💻 Author

[RAVINDU BHAGYA] - [PS/2022/229]
University of Kelaniya