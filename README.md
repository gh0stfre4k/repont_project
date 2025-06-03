# Repont Projekt

Ez a projekt egy Laravel + React alkalmazás, amely visszaváltott üdítők adatait dolgozza fel és jeleníti meg Pareto-diagram formájában.  
A backend Laravel, a frontend React + Tailwind + Vite alapon készült.

---

Technológia

Backend: Laravel 12.x
Frontend: React 19, Vite, TailwindCSS, Recharts
Adatbázis: SQLite / MySQL (Seeder támogatással)
Diagram: Pareto (Recharts)
Routing: React Router DOM + Laravel API routing
Telepítés: XAMPP lokális környezetre optimalizálva

Kész funkciók

Termékek szimulált adatainak betöltése (seeder)
Pareto-leaderboard visszaváltott üdítőkre
Diagram interakció – kattintás esemény részletezéshez
Szűrés dátum és gép alapján
Alap Vue/React router integráció
Gépek dinamikus lekérdezése
Események táblázatos megjelenítése

Hátralévő elemek

Teljes Tailwind build és UI finomhangolás
Proper .env.production és .htaccess a közös domain-hez
Git commit message-ek strukturált javítása (feat:, fix:)
Tesztelés mobilnézeten (responsiveness)
Hibakezelés frontend oldalon (pl. API error)
Teljes logolás
Redux kliens
SSO használata loginhoz

Teszteléshez 

login: admin@teszt.hu
pass: password