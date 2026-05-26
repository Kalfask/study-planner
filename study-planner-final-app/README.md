# Study Planner

Το **Study Planner** είναι μια full-stack web εφαρμογή για οργάνωση μελέτης. Στόχος της εργασίας είναι να προσφέρει σε έναν φοιτητή ή μαθητή ένα ενιαίο περιβάλλον όπου μπορεί να διαχειρίζεται μαθήματα, εργασίες, πρόγραμμα μελέτης, χρονόμετρο συγκέντρωσης και βασικά στατιστικά προόδου.

Η εφαρμογή αποτελείται από React frontend και Spring Boot backend, με αποθήκευση δεδομένων σε MySQL και authentication με JWT.

## Περιεχόμενα

- [Βασικές λειτουργίες](#βασικές-λειτουργίες)
- [Τεχνολογίες](#τεχνολογίες)
- [Δομή project](#δομή-project)
- [Προαπαιτούμενα](#προαπαιτούμενα)
- [Εκτέλεση εφαρμογής](#εκτέλεση-εφαρμογής)
- [Ρυθμίσεις βάσης δεδομένων](#ρυθμίσεις-βάσης-δεδομένων)
- [API endpoints](#api-endpoints)
- [Σελίδες εφαρμογής](#σελίδες-εφαρμογής)

## Βασικές λειτουργίες

- Εγγραφή και σύνδεση χρήστη.
- Προστατευμένες σελίδες με JWT authentication.
- Δημιουργία, προβολή, επεξεργασία και διαγραφή μαθημάτων.
- Προβολή λεπτομερειών μαθήματος.
- Διαχείριση εργασιών με κατάσταση ολοκλήρωσης, ημερομηνίες και σύνδεση με μάθημα.
- Εβδομαδιαίο πρόγραμμα μελέτης με slots.
- Pomodoro/focus timer για καταγραφή συνεδριών μελέτης.
- Στατιστικά μελέτης, όπως ώρες ανά εβδομάδα, παραγωγικότητα και ολοκλήρωση εργασιών.
- Dashboard με σύνοψη μαθημάτων, εργασιών, προθεσμιών και επερχόμενων συνεδριών.

## Τεχνολογίες

### Frontend

- React 19
- React Router
- Axios
- CSS modules/stylesheets ανά ενότητα
- Local storage για αποθήκευση JWT token

### Backend

- Java 17
- Spring Boot 3.2.5
- Spring Web
- Spring Data JPA
- Spring Security
- Bean Validation
- JWT authentication
- MySQL
- Maven

## Δομή project

```text
study-planner-final-app/
├── backend/
│   └── backend/
│       ├── src/main/java/com/studyplanner/backend/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── model/
│       │   ├── repository/
│       │   ├── service/
│       │   └── util/
│       └── src/main/resources/application.properties
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── pages/
│       └── styles/
├── icons/
├── study_planner_demo.jsx
└── study_planner_spec.pdf
```

## Προαπαιτούμενα

Πριν την εκτέλεση χρειάζονται:

- Java 17
- Node.js και npm
- MySQL server, για παράδειγμα μέσω XAMPP
- Maven wrapper, που υπάρχει ήδη στο backend project

## Εκτέλεση εφαρμογής

### 1. Βάση δεδομένων

Δημιουργήστε στη MySQL μια βάση με όνομα:

```sql
CREATE DATABASE studyplanner2;
```

Οι πίνακες δημιουργούνται/ενημερώνονται αυτόματα από το Spring Boot μέσω JPA, επειδή η ρύθμιση είναι:

```properties
spring.jpa.hibernate.ddl-auto=update
```

### 2. Backend

Από τον φάκελο του backend:

```powershell
cd backend/backend
.\mvnw.cmd spring-boot:run
```

Το backend τρέχει στο:

```text
http://localhost:8080
```

### 3. Frontend

Από τον φάκελο του frontend:

```powershell
cd frontend
npm install
npm start
```

Το frontend τρέχει στο:

```text
http://localhost:3000
```

Το frontend επικοινωνεί με το backend μέσω:

```text
http://localhost:8080/api
```

## Ρυθμίσεις βάσης δεδομένων

Οι βασικές ρυθμίσεις βρίσκονται στο:

```text
backend/backend/src/main/resources/application.properties
```

Τρέχουσα σύνδεση:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/studyplanner2?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=
```

Αν η τοπική MySQL έχει διαφορετικό username ή password, πρέπει να αλλαχθούν οι αντίστοιχες τιμές.

## API endpoints

### Authentication

| Method | Endpoint | Περιγραφή |
| --- | --- | --- |
| POST | `/api/auth/register` | Εγγραφή νέου χρήστη |
| POST | `/api/auth/login` | Σύνδεση χρήστη και επιστροφή JWT |

### Courses

| Method | Endpoint | Περιγραφή |
| --- | --- | --- |
| GET | `/api/courses` | Λίστα μαθημάτων χρήστη |
| POST | `/api/courses` | Δημιουργία μαθήματος |
| PUT | `/api/courses/{id}` | Ενημέρωση μαθήματος |
| DELETE | `/api/courses/{id}` | Διαγραφή μαθήματος |

### Tasks

| Method | Endpoint | Περιγραφή |
| --- | --- | --- |
| GET | `/api/tasks` | Λίστα εργασιών |
| POST | `/api/tasks` | Δημιουργία εργασίας |
| PUT | `/api/tasks/{id}` | Ενημέρωση εργασίας |
| DELETE | `/api/tasks/{id}` | Διαγραφή εργασίας |

### Study Sessions

| Method | Endpoint | Περιγραφή |
| --- | --- | --- |
| GET | `/api/sessions` | Λίστα συνεδριών μελέτης |
| POST | `/api/sessions` | Καταγραφή νέας συνεδρίας |
| GET | `/api/sessions/stats` | Στατιστικά συνεδριών |

### Schedules

| Method | Endpoint | Περιγραφή |
| --- | --- | --- |
| GET | `/api/schedules` | Λίστα προγραμμάτων |
| POST | `/api/schedules` | Δημιουργία προγράμματος |
| PUT | `/api/schedules/{id}/activate` | Ενεργοποίηση προγράμματος |
| DELETE | `/api/schedules/{id}` | Διαγραφή προγράμματος |
| GET | `/api/schedules/{id}/slots` | Προβολή slots προγράμματος |
| POST | `/api/schedules/{id}/slots` | Προσθήκη slot |
| DELETE | `/api/schedules/{id}/slots/{slotId}` | Διαγραφή slot |

## Σελίδες εφαρμογής

- `/login`: σύνδεση χρήστη
- `/register`: εγγραφή χρήστη
- `/dashboard`: κεντρική σύνοψη
- `/courses`: διαχείριση μαθημάτων
- `/courses/:id`: λεπτομέρειες μαθήματος
- `/tasks`: διαχείριση εργασιών
- `/timer`: focus timer και συνεδρίες μελέτης
- `/schedule`: εβδομαδιαίο πρόγραμμα
- `/stats`: στατιστικά προόδου

## Ασφάλεια

Το backend χρησιμοποιεί Spring Security με stateless authentication. Τα endpoints του `/api/auth/**` είναι δημόσια, ενώ όλα τα υπόλοιπα endpoints απαιτούν JWT token στο header:

```text
Authorization: Bearer <token>
```

Το token αποθηκεύεται στο frontend στο `localStorage` και προστίθεται αυτόματα στα requests μέσω Axios interceptor.

## Συμπέρασμα

Η εργασία υλοποιεί μια ολοκληρωμένη εφαρμογή διαχείρισης μελέτης με διαχωρισμό frontend/backend, authentication, βάση δεδομένων και λειτουργίες CRUD. Το Study Planner συγκεντρώνει τις βασικές ανάγκες οργάνωσης ενός μαθητή ή φοιτητή σε ένα πρακτικό και εύχρηστο περιβάλλον.
