# Live Hospital Bed Monitoring Platform

A full-stack hospital management system featuring a React.js landing page and dashboards, Express.js API, MongoDB storage, JWT authentication, and role-based access for receptionists, nurses, and doctors.

## Structure

- `server/` — Express backend, MongoDB models, JWT auth, demo data seeding
- `client/` — React + Vite frontend with landing page, login cards, and dashboards

## Setup

### Backend

1. Open terminal in `server`
2. Install dependencies

```bash
cd server
npm install
```

3. Create `.env` from `.env.example`

```bash
copy .env.example .env
```

4. Start backend

```bash
npm run dev
```

5. Seed sample data

```bash
npm run seed
```

### Frontend

1. Open terminal in `client`
2. Install dependencies

```bash
cd client
npm install
```

3. Start frontend

```bash
npm run dev
```

### Root workspace commands

From the project root, you can now run:

```bash
npm install
npm run seed
npm run dev-server
npm run dev-client
```

### Default Login Credentials

- Receptionist: `receptionist1` / `Password123`
- Nurse: `nurse1` / `NurseCare21`
- Doctor: `doctor1` / `DoctorPro!9`

## Notes

- API base is configured in `client/src/api.js` and defaults to `http://localhost:5000/api`
- The frontend includes role-based dashboards, live bed status visualization, and analytics graphs
