
# 🧪 Validation Rules

## 🎯 Objective

Define strict validation rules across the application.

The goal is to ensure:

* All input is validated
* No invalid data reaches business logic
* Consistent validation behavior

Claude MUST follow these rules strictly.

---

## 🧠 Core Principle

ALL external input MUST be validated before reaching services

---

## 🧩 Validation Strategy

* Use DTOs with class-validator
* Use global validation pipe

---

## ⚙️ Global Validation (MANDATORY)

---

### ✅ DO

Enable global validation pipe with:

* `whitelist: true`
* `forbidNonWhitelisted: true`
* `transform: true`

---

### ❌ DON'T

* Do NOT validate manually in controllers/services
* Do NOT allow unknown fields

---

---

## 🧾 DTO Validation

---

### ✅ DO

* Validate ALL inputs via DTOs
* Use explicit decorators

---

### ❌ DON'T

* Do NOT accept raw request data
* Do NOT skip validation

---

---

## 🔄 Transformation

---

### ✅ DO

* Use `transform: true` to convert types

---

### ❌ DON'T

* Do NOT manually cast types in services

---

---

## ⚠️ Anti-Patterns

Claude MUST avoid:

* Missing DTOs
* Manual validation logic
* Accepting unsafe input

---

## 🛑 Final Rule

If input is not validated:

→ STOP
→ Add DTO + validation

Validation is **mandatory for all endpoints**
