# 🏋️ FitLog

FitLog is a responsive workout library and fitness planning application built with Next.js. Users can browse workouts, view detailed exercise information, add workouts to today's plan, save workouts for later, and track their daily workout statistics.

## 🚀 Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Icons
- React Hot Toast
- FitLog API
- Local Storage

## ✨ Key Features

### 1. Workout Library
Browse a collection of workouts with information including muscle groups, equipment, duration, calories burned, and ratings.

### 2. Workout Details
View detailed information about each workout, including description, difficulty, sets, reps, instructions, duration, calories, and rating.

### 3. Today's Workout Plan
Add workouts to Today's Plan and track the number of exercises, total workout minutes, and total calories.

### 4. Save Workouts
Save workouts for later and access them from the Saved tab on the My Plan page.

### 5. Workout Management
Mark planned workouts as done or remove workouts from the plan with toast notifications.

## 🎯 Additional Features

- Responsive design for mobile, tablet, and desktop
- Custom 404 page
- Loading animation while workout data is loading
- Toast notifications
- Plan and Saved counters in the navbar
- Maximum of 5 workouts in Today's Plan
- Data persistence using localStorage
- Dynamic workout detail pages
- Sort workouts by duration, calories, or rating

## 📱 Responsive Design

FitLog is fully responsive and designed to work across:

- Mobile devices
- Tablets
- Desktop screens

## 🔗 Routes

- `/` — Workout Library
- `/workout/[id]` — Workout Details
- `/my-plan` — Today's Plan and Saved Workouts

## 💾 Local Storage

Today's Plan and Saved workouts are stored in the browser's localStorage so that the data remains available after refreshing the page.

## 👩‍💻 Author

Developed as part of the Programming Hero B14 Assignment 6.
