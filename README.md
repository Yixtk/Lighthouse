#⚠️ Lighthouse

An interactive survival game built with p5.js where you play as the last lighthouse keeper, guiding ships safely through a dark and dangerous night filled with sea monsters and treacherous reefs.

🎮 **[Play the Game Online](https://editor.p5js.org/yc7458/sketches/3fG0Ud8em)**

## 📖 Game Description

As the last lighthouse keeper, you must survive until daybreak while defending against mysterious sea creatures and guiding lost ships to safety. Use your lighthouse's powerful beam to fight off tentacled monsters and illuminate hidden reefs in the treacherous waters.

## 🎯 Objective

Survive for 90 seconds until morning arrives. You'll face two types of challenges:
- **Monster Attacks**: Defeat tentacles and sea monsters using your lighthouse beam
- **Ship Rescue**: Guide lost ships safely to shore while avoiding deadly reefs

## 🕹️ Controls

| Control | Action |
|---------|--------|
| **SPACEBAR** | Toggle lighthouse beam on/off |
| **MOUSE** | Control beam direction / Drag ships to safety |

## 🎮 How to Play

1. **Start Screen**: Click the "Start" button to begin your night shift
2. **During Gameplay**:
   - Press **SPACEBAR** to turn the lighthouse beam on/off
   - **Aim the beam** at tentacles and monsters to damage them
   - **Click and drag ships** to guide them safely around reefs
   - Watch the **radar** in the top-left to track threats
   - Monitor the **time remaining** (lighthouse icon, top-right)
3. **Win Condition**: Survive until daybreak (90 seconds)
4. **Lose Condition**: 
   - A monster reaches the shore
   - A ship crashes into a reef

## ✨ Features

- **Dynamic Combat System**: Fight off waves of tentacles and sea monsters with your light beam
- **Ship Rescue Mechanic**: Drag ships to safety while avoiding obstacles
- **Radar System**: Track enemies and ships on your radar display
- **Time Pressure**: 90-second survival challenge
- **Atmospheric Audio**: Ocean waves, night ambiance, thunder, and morning sounds
- **Multiple Enemy Types**: 
  - Tentacles with 100 HP
  - Monsters with 150 HP that move toward shore
- **Interactive Environment**: Procedurally generated reefs and dynamic lighting

## 🎨 Game Screens

### 1. Title Screen
- Beautiful lighthouse illustration
- Game instructions
- Start button

### 2. Gameplay Screen
- Inside lighthouse view
- Working radar display
- Light beam control
- Time remaining indicator
- Enemy and ship management

### 3. Game Over Screen
- Displayed when you fail
- Restart option

### 4. Victory Screen
- Congratulations message
- Sunrise view
- Restart option

## 🛠️ Technical Stack

- **p5.js**: Main game framework
- **JavaScript**: Game logic and interactions
- **HTML5 Canvas**: Rendering engine

## 📁 Project Structure

```
Lighthouse/
│
├── Script.js           # Main game code
├── README.md          # This file
│
└── Assets/
    ├── background1.png
    ├── tentacle1.png
    ├── monster1.png
    ├── ship2.png
    ├── reef1.png
    ├── ocean-wave-2.mp3
    ├── sea-at-night-17353.mp3
    ├── big-thunder-recorded-in-stereo-with-rain-fall-and-lightning-67697.mp3
    └── morning-breeze-and-birds-35105.mp3
```

## 🎲 Game Mechanics

### Combat System
- **Light Beam**: Your primary weapon against monsters
- **Tentacles**: Stationary enemies with 100 HP
- **Monsters**: Mobile enemies with 150 HP that move toward shore
- **Attack Strategy**: Focus the beam on enemies to deal continuous damage

### Ship Rescue System
- **Random Spawning**: Ships appear at random positions
- **Drag Mechanic**: Click and drag ships within the allowed boundary
- **Reef Detection**: Ships must avoid reefs or the game ends
- **Destination System**: Guide ships to the marked safe zone
- **Limited Movement Area**: Ships can only be moved within specific boundaries (X: 400-950, Y: 80-290)

### Wave System
- Random events every 10 seconds
- 50% chance of monster attack
- 50% chance of ship rescue mission

### Difficulty Progression
- Monsters must be defeated completely before new waves
- Two tentacles must be defeated before the main monster appears
- Time pressure increases tension as morning approaches

## 🔧 Setup & Installation

### Option 1: Play Online
Simply visit the [online version](https://editor.p5js.org/yc7458/sketches/3fG0Ud8em) and click play!

### Option 2: Run Locally

1. **Clone or download** this repository

2. **Ensure all assets are in place**:
   - Image files (PNG format)
   - Audio files (MP3 format)

3. **Run with a local server**:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js
   npx http-server
   ```

4. **Open your browser** and navigate to `http://localhost:8000`

5. **Create an HTML file** (if not present):
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script>
   </head>
   <body>
       <script src="Script.js"></script>
   </body>
   </html>
   ```

## 🎯 Tips & Strategies

1. **Master the Beam**: Toggle the beam on/off strategically to save energy
2. **Use the Radar**: Keep an eye on the radar to anticipate threats
3. **Prioritize Threats**: Focus on monsters approaching the shore first
4. **Plan Ship Routes**: Before dragging, visualize the safest path
5. **Light Up Reefs**: Use your beam to reveal hidden reefs before moving ships
6. **Stay Calm**: The 90 seconds can feel long - don't rush!

## 🐛 Known Issues & Recent Fixes

### Fixed in Latest Version:
- ✅ Monster targeting coordinates corrected
- ✅ Ship drag hitbox properly aligned
- ✅ Game restart now properly resets all variables
- ✅ Adjusted ship drag boundaries for better game balance

## 🎨 Credits

- **Game Design & Development**: Created with p5.js
- **Sound Effects**: Ocean waves, ambient sounds, and natural audio
- **Art Style**: Minimalist pixel-art inspired graphics

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📧 Contact

For questions or feedback, please visit the [p5.js editor page](https://editor.p5js.org/yc7458/sketches/3fG0Ud8em).

---

**May you see the daylight!** 🌅
*-- Last lighthouse keeper*

