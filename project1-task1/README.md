# Personal Developer Portfolio &bull; S. Shanmuga Priya

> **MCA Student &bull; Aspiring Full Stack Web Developer**  
> *Thanthai Hans Roever College*

A complete, modern, attractive, professional, and fully responsive personal developer portfolio website crafted for **S. Shanmuga Priya**, an MCA post-graduate student and fresher full-stack web developer. Built with clean semantic **HTML5**, modern **CSS3** (Flexbox, Grid & Custom Properties), and vanilla **JavaScript (ES6+)**.

---

## 🌟 Key Features

1. **Modern Developer Aesthetics & Palette**
   - Professional midnight navy, indigo, and violet gradient theme (`#0A0F1D`, `#6366F1`, `#8B5CF6`).
   - Glassmorphism effects with backdrop blur, rounded card containers, and glowing ambient accents.
   - Smooth transitions, button hover effects, and modern typography (*Plus Jakarta Sans* and *JetBrains Mono*).

2. **Dark Mode & Light Mode with Persistence**
   - One-click theme toggle switch with animated Sun/Moon icons.
   - Smooth CSS variable transition across backgrounds, cards, text, and borders.
   - Saves selected theme preference to browser `localStorage` and loads automatically upon return.
   - Respects operating system `prefers-color-scheme` as the initial fallback.

3. **Dynamic Home / Hero Section**
   - Status badge: `✨ Open to Opportunities • Fresher MCA` with animated pulsing green indicator.
   - Prominent heading: `"Hi, I'm S. Shanmuga Priya"`.
   - Dynamic auto-typing subtitle: `"An MCA Student | Aspiring Full Stack Web Developer"`.
   - Clear introduction: `"I am an MCA student passionate about web development and programming. I enjoy building responsive websites and developing practical applications using modern web technologies."`
   - Primary action buttons: **View My Projects** and **Download Resume**.
   - Profile visual with animated gradient halo and floating tech badges.
   - Editable social media icon links (GitHub, LinkedIn, Email, Phone).

4. **About Me Section**
   - Two-column profile layout with sticky summary card and personal info table.
   - Structured narrative sections:
     - **Educational Background:** BCA graduate now pursuing Master of Computer Applications (MCA) at Thanthai Hans Roever College.
     - **Interest in Web Development:** Passion for turning logical designs into interactive, database-backed web solutions.
     - **Technical Learning Journey:** Mastering web fundamentals (HTML5/CSS3), client-side JavaScript, and full-stack PHP & MySQL.
     - **Career Objective:** Aiming to launch a career as an entry-level Full Stack Web Developer in a progressive team.

5. **Education Section**
   - Interactive academic timeline with badges and icons:
     - **Master of Computer Applications (MCA)** &bull; Thanthai Hans Roever College (2024 &ndash; 2026, Pursuing)
     - **Bachelor of Computer Applications (BCA)** &bull; Thanthai Hans Roever College (2021 &ndash; 2024, Completed)
   - Highlighted key coursework tags (*Advanced Web Technologies, DBMS, Software Engineering, Object-Oriented Programming, Computer Networks*).
   - Dedicated institution highlight card for Thanthai Hans Roever College.

6. **Technical Skills Section**
   - Honest, beginner-friendly skill representation without inflated claims:
     - **Frontend:** HTML5 (Intermediate / Core), CSS3 (Intermediate / Core), JavaScript (Beginner / Actively Practicing).
     - **Backend & Database:** PHP (Intermediate / Project-proven), MySQL (Intermediate / Project-proven).
     - **Tools & Workflow:** VS Code, Git & GitHub (Basics), XAMPP Localhost, Responsive Design, Form Validation.
   - Interactive cards with brand icons, skill tags, and smooth animated progress bars.

7. **Featured Projects Section & Interactive Modal**
   - **Flagship Project: Staff Automation System**
     - Full-stack web application designed to simplify staff activities and automate administrative records.
     - Built with **HTML5, CSS3, PHP, and MySQL**.
     - Features: Staff Login, Dashboard, Staff Information Management (CRUD), MySQL Database Connectivity, User-Friendly Interface.
     - Interactive **"View Project Details"** modal popup displaying complete system architecture, problem statement, core modules, and tech stack tags.
     - Editable GitHub source code button with tooltips.
   - **Supplementary Projects:**
     - *Personal Developer Portfolio Website* (HTML5, CSS3, JavaScript ES6+).
     - *Student Records & Attendance Portal* (PHP, MySQL, HTML5, CSS3).

8. **ATS-Friendly Resume Section**
   - Clean, digital ATS-compliant resume preview embedded right into the webpage.
   - **Download Resume (PDF)** button linking to the real document at `assets/resume.pdf`.
   - **Print / Browser Preview** button triggering `window.print()` with a specialized `@media print` clean stylesheet.
   - Open PDF in a new tab button.

9. **Contact Section with Real-Time Validation**
   - Contact cards with 1-click clipboard copy buttons for Email, Phone number, LinkedIn, and GitHub placeholders.
   - Interactive contact form (*Name, Email, Subject, Message* with character counter).
   - Real-time client-side JavaScript validation (email regex, minimum length checks, error messages).
   - Transparent submission modal: Informs users that inputs are validated on the client side and provides an instant **"Open in Email Client"** button prefilled with the user's message, plus a 1-click **"Copy Message"** button.

10. **Mobile-First Responsive Navigation**
    - Fixed sticky header with dynamic blur and shadow on scroll.
    - Responsive mobile hamburger menu with smooth slide-down drawer and animated 'X' icon.
    - Automatic closing when any menu item is selected or when clicking outside.
    - Active link highlighting (ScrollSpy) as the user scrolls through sections.
    - Back-to-top floating button appearing past 350px scroll depth.

---

## 📁 Project Structure

```
task1/
│
├── index.html                  # Main semantic HTML5 single-page application
│
├── css/
│   ├── style.css               # Core styling, CSS variables, typography, animations & components
│   └── responsive.css          # Mobile-first breakpoints (mobile, tablet, desktop) & print styles
│
├── js/
│   └── script.js               # Theme toggle, mobile drawer, modals, validation, scrollspy & toast
│
├── images/
│   ├── profile.jpg             # High-resolution developer profile picture placeholder
│   ├── profile-avatar.svg      # Scalable vector avatar illustration fallback
│   ├── project1.png            # Staff Automation System dashboard screenshot mockup
│   ├── project-staff-automation.svg # Vector mockup for Staff Automation System
│   ├── project-portfolio.svg   # Vector mockup for Developer Portfolio
│   └── project-student-system.svg   # Vector mockup for Student Records Portal
│
├── assets/
│   └── resume.pdf              # Real, ATS-friendly PDF resume document for S. Shanmuga Priya
│
├── portfolio/                  # Bundled standalone copy matching standard repository guidelines
│
└── README.md                   # Comprehensive documentation and deployment guide
```

---

## ✏️ How to Customize Personal Information

All personal details have clearly marked editable placeholders. Follow these quick steps to personalize the website:

### 1. Update Contact Details & Links
In `index.html`, search for `your.email@example.com` or `[Editable]` and replace them with your actual details:
- **Email:** Replace `your.email@example.com` with your real email address in both the hero, contact section, and resume sections.
- **Phone:** Replace `+91 98765 43210` with your phone number.
- **LinkedIn:** Update `https://linkedin.com/in/yourprofile` with your actual LinkedIn profile URL.
- **GitHub:** Update `https://github.com/yourusername` with your GitHub username.
- **Project Repositories:** Update the project GitHub URLs in `index.html` and `js/script.js` under `projectsData`.

### 2. Replace the Profile Photo
- Place your professional headshot or photo in the `images/` folder with the filename `profile.jpg` (or change the `src` attribute in `index.html` line 125 to point to your image file).
- The website automatically scales and clips your photo inside the circular glowing frame.

### 3. Update the Resume PDF
- Whenever you export an updated resume PDF from Word, Canva, or LaTeX, simply copy it into the `assets/` directory and rename it to `resume.pdf`.
- The "Download Resume" buttons and "Open PDF" buttons will automatically serve your latest file without needing code modifications.

---

## 🚀 Deployment Instructions

This website is built with vanilla web technologies (HTML, CSS, JS) and requires **no build step, compilers, or server configuration**. It can be deployed in less than 2 minutes to any free static host.

### Option 1: Deploy to GitHub Pages (Recommended for Developers)
1. Initialize a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: S. Shanmuga Priya Developer Portfolio"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```
2. On GitHub, go to your repository **Settings** &rarr; **Pages**.
3. Under **Branch**, select `main` and root folder `/`, then click **Save**.
4. In 1&ndash;2 minutes, your portfolio will be live at:
   `https://yourusername.github.io/portfolio/`

### Option 2: Deploy to Netlify (Drag & Drop in 30 Seconds)
1. Go to [netlify.com](https://www.netlify.com/) and log in or sign up.
2. In your dashboard, click **Add new site** &rarr; **Deploy manually**.
3. Drag and drop the `task1` folder directly into the Netlify upload box.
4. Your site will instantly go live with a free custom SSL certificate (e.g., `https://shanmuga-priya-portfolio.netlify.app`).

### Option 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** &rarr; **Project** and select your GitHub repository.
3. Keep default settings (no build command needed) and click **Deploy**.
4. Your site is live on Vercel's global CDN.

---

## 💻 Local Testing

To view the website on your local computer:
1. Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Firefox, or Safari.
2. Alternatively, if using VS Code, right-click `index.html` and select **"Open with Live Server"**.

### Browser Support
- Google Chrome (Latest)
- Mozilla Firefox (Latest)
- Microsoft Edge (Latest)
- Apple Safari (Latest)
- Mobile Browsers: Chrome for Android, iOS Safari, Samsung Internet

---

## 📄 License & Credits

- **Developer:** S. Shanmuga Priya (MCA Student, Thanthai Hans Roever College)
- **Design & Code:** Built with passion &bull; Clean, accessible, modern web standards.
- &copy; 2026 S. Shanmuga Priya. All rights reserved.
