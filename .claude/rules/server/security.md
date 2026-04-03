# 🔐 Security Rules

## 🎯 Objective

Define strict security rules across the backend.

The goal is to ensure:

* Secure authentication
* Safe data handling
* Protection against common vulnerabilities

Claude MUST follow these rules strictly.

---

## 🧠 Core Principle

Security is **NON-NEGOTIABLE**

If a feature is not secure → it MUST NOT be implemented

---

## 🔐 Authentication Security

---

### ✅ DO

* Use JWT with expiration
* Store tokens in HTTP-only cookies
* Use secure cookie flags (Secure, SameSite)

---

### ❌ DON'T

* Do NOT store tokens in localStorage
* Do NOT expose tokens in responses

---

---

## 🔑 Password Security

---

### ✅ DO

* Hash passwords using bcrypt
* Use strong salt rounds

---

### ❌ DON'T

* Do NOT store plain passwords
* Do NOT log passwords

---

---

## 🧾 Input Security

---

### ✅ DO

* Validate ALL inputs via DTOs
* Use whitelist validation

---

### ❌ DON'T

* Do NOT trust client input
* Do NOT allow unknown fields

---

---

## 🗄️ Database Security

---

### ✅ DO

* Use Prisma (prevents SQL injection)
* Sanitize sensitive outputs

---

### ❌ DON'T

* Do NOT expose sensitive fields
* Do NOT run raw queries unnecessarily

---

---

## 🌐 API Security

---

### ✅ DO

* Use guards for protected routes
* Restrict access properly

---

### ❌ DON'T

* Do NOT leave endpoints unprotected when needed

---

---

## ⚠️ Sensitive Data

---

### ✅ DO

* Remove fields like:

  * password
  * tokens

---

### ❌ DON'T

* Do NOT leak internal data structures

---

---

## 🚫 Common Vulnerabilities (MUST PREVENT)

Claude MUST prevent:

* XSS (never trust input)
* Injection attacks
* Broken auth flows
* Data leaks
* Insecure storage

---

---

## 🔄 Logging

---

### ✅ DO

* Log important actions (auth, errors)

---

### ❌ DON'T

* Do NOT log sensitive data

---

---

## 🛡️ Rate Limiting (RECOMMENDED)

---

### ✅ DO

* Protect sensitive endpoints (login, auth)

---

---

## 🧠 Principle of Least Privilege

---

### ✅ DO

* Grant only necessary access

---

---

## 🛑 Final Rule

If any implementation introduces:

* Security risk
* Data exposure
* Weak authentication

→ STOP
→ Refactor immediately

Security is **mandatory and critical**
