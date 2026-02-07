# 🚀 AWS Application Load Balancer + Auto Scaling Group + Docker App

This project demonstrates deploying a **Dockerized backend application** on **AWS EC2**, fronted by an **Application Load Balancer (ALB)** and managed using an **Auto Scaling Group (ASG)** with CPU-based scaling.

---

## 🧩 Architecture Overview

```
User → ALB (HTTP :80)
        ↓
   Target Group (:3000)
        ↓
   EC2 Instances (Auto Scaling Group)
        ↓
   Docker Containers (Node.js App + MongoDB)
```

---

## 🛠 Tech Stack

* AWS EC2
* Application Load Balancer (ALB)
* Auto Scaling Group (ASG)
* Docker & Docker Compose
* Node.js Backend
* MongoDB
* Amazon Linux 2

---

## 📦 Application Details

* Backend runs on **port 3000**
* API endpoint example:

  * `/` → Health check
  * `/users` → Fetch users from MongoDB

---

## 🐳 Docker Setup (on EC2)

Containers running:

* **Backend container** → port `3000`
* **MongoDB container** → port `27017`

Check containers:

```bash
docker ps
```

Test locally on EC2:

```bash
curl http://localhost:3000
```

---

## ⚖️ Application Load Balancer (ALB) Configuration

### 1️⃣ Create ALB

* Type: **Application Load Balancer**
* Scheme: **Internet-facing**
* IP type: **IPv4**
* Listener: **HTTP :80**
* VPC: same as EC2
* Subnets: select **public subnets**

### 2️⃣ ALB Security Group

Inbound rules:

| Type | Port | Source    |
| ---- | ---- | --------- |
| HTTP | 80   | 0.0.0.0/0 |

---

## 🎯 Target Group Configuration

* Target type: **Instance**
* Protocol: **HTTP**
* Port: **3000**
* Health check path: `/`
* Success codes: `200`

⚠️ Ensure EC2 security group allows traffic **from ALB SG** on port `3000`

---

## 📈 Auto Scaling Group (ASG) Setup

### 1️⃣ Launch Template

* AMI: Amazon Linux 2
* Instance type: t2.micro
* Security group: allow `3000` from ALB SG
* User data (example):

```bash
#!/bin/bash
yum update -y
yum install docker -y
service docker start
usermod -a -G docker ec2-user
```

### 2️⃣ Create ASG

* Attach ALB Target Group
* Desired capacity: `1`
* Min: `1`
* Max: `2`

---

## 🔄 Auto Scaling Policy (CPU Based)

* Policy type: **Target tracking**
* Metric: **Average CPU Utilization**
* Target value: **50%**

---

## 🧪 Testing

### Access via ALB DNS

```
http://<ALB-DNS-NAME>
```

Example:

```
App running + DB connected 🚀
```

Test API:

```
http://<ALB-DNS-NAME>/users
```

---

## 🛑 Common Issues & Fixes

### ❌ 504 Gateway Timeout

**Reasons:**

* Target group unhealthy
* Wrong health check path
* Port mismatch (ALB → 3000)
* Security group not allowing ALB

**Fix:**

* Check Target Group → Targets → Healthy
* EC2 SG: allow inbound `3000` **from ALB SG**

---

### ❌ Port already allocated (Docker)

```bash
docker: Bind for 0.0.0.0:3000 failed
```

**Fix:**

```bash
docker stop <container-id>
docker rm <container-id>
```

or use another port.

---

## 📸 Screenshots Included

* EC2 Docker containers running
* ALB active status
* ASG instance attached
* API response via browser

---

## 📌 Author

**Puja Nanekar**

---

## ⭐ If you found this helpful

Give this repo a ⭐ and feel free to fork 🚀
