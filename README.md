Kumail Raza Portfolio — Render Static Site
Ye latest portfolio ka React, TypeScript aur Vite version hai. Ismein tamam components, CSS, project screenshots, technology logos, meri image aur intro video shamil hain.
Isko chalane ke liye database, backend, ChatGPT login, HeyGen API key ya secret environment variables ki zaroorat nahi.
Render par deploy karne ka tareeqa
1. ZIP extract karo. Tamam files Kumail-Portfolio-Render folder mein hain.
2. Is folder ke andar wali files GitHub repository mein upload ya push karo. Repository ke main folder mein package.json, package-lock.json, index.html, src/ aur public/ hone chahiye. Sirf ZIP upload mat karna.
3. Render Dashboard mein New → Static Site select karo aur repository connect karo.
4. Ye settings rakho:
Setting	Value
Branch	Apni branch, aam tor par main
Root Directory	Khali, agar package.json repo ke main folder mein hai
Build Command	npm ci && npm run build
Publish Directory	dist
Start Command	Zaroorat nahi
Database	Zaroorat nahi
API keys	Zaroorat nahi


5. Chaaho to SKIP_INSTALL_DEPS=true set karo. Isse dependencies build command mein maujood npm ci install karegi.
6. Create Static Site par click karo. Build complete hone ke baad Render ka diya hua link kholo.
render.yaml bhi project mein shamil hai. Render Blueprint se repository connect karne par settings isi file se mil jayengi. Manual setup mein upar wali settings use karo.
Agar existing Render service use kar rahe ho to uski type Static Site honi chahiye.
Apne computer par chalana
Node.js 22.16.0 ya compatible newer version use karo. Minimum version 22.13 chahiye.
Project folder mein terminal khol kar ye commands chalao:
npm ci
npm run dev

Terminal mein jo localhost link aaye, usko browser mein kholo.
Production build banane aur check karne ke liye:
npm run build
npm run preview

index.html ko double-click karke mat kholo. React project chalane ke liye Vite server ya production build chahiye.
Images, video, voice aur content
Sab kuch project ki files mein hai; database nahi chahiye:
- public/intro-packed.mp4: latest intro video, voice aur transparency mask ke saath. Ye iPhone fix wala version hai.
- public/intro.webm: original transparent video.
- public/portrait.png: intro se pehle aur baad mein dikhne wali image.
- public/tech/: technology logos.
- public/: project screenshots, jinmein Zeina Atelier aur ScentedVenture bhi hain.
- src/App.tsx: projects ki details, links, about aur contact information.
- src/globals.css: theme, responsive layout aur animations.
- src/HeroPortrait.tsx: intro play, stop aur replay ka code.
- src/transparentIntro.ts: video ki original transparency se cutout dikhane ka code.
Build ke waqt Vite, public ki files dist mein copy kar deta hai. Render video aur images tumhari apni site se serve karta hai.
Supabase, MongoDB, PostgreSQL, Cloudinary ya alag video hosting ki zaroorat nahi.
Email link click karne par visitor ki email app khulti hai. Contact messages website mein save nahi hote. Fonts Google Fonts se load hote hain.
Content change karne ke liye files edit karke GitHub par push karo. Render ka auto-deploy on ho to update khud deploy ho jayega.
Intro kaise chalta hai
Page load hone ke baad intro ek dafa voice ke saath khud chalne ki koshish karta hai.
Browser sound wala autoplay block kar sakta hai. Aesi surat mein image aur play button show hote rehte hain.
Play button click karne par intro chalta hai. Intro complete hone par image wapas aa jati hai. Isi button se replay ya stop kar sakte ho.
Hero screen se bahar jane ya browser tab hide hone par intro ruk jata hai. Video loop nahi hoti aur voice ka alag button nahi hai.
Checking
TypeScript check aur production build pass hain. Video ki transparency bhi check ki gayi hai: background transparent aur black suit opaque rehta hai.
Asli iPhone aur tamam browsers par testing abhi baqi hai. Deploy ke baad ye cheezen check karo:
- Hero layout aur animations.
- Intro video, voice, replay aur stop.
- Project filters aur links.
- Mobile menu aur responsive layout.
- iPhone par intro ka transparent background.
Render ki official guides
- Static Sites
- Blueprint Settings
