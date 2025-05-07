# Online-Voting-system-through-QR-code-using-AES-algorithm
Cyber PBL

> ⚠️ **Status**: This project is currently in the **working phase**. Some features may be incomplete or under development.
---

## Motivation 
Traditional voting systems often face challenges like voter fraud, long queues, mismanagement, and lack of digital engagement. Our project aims to solve this by introducing a QR Code Based Voting System that ensures only eligible users can vote, and only once. It leverages QR code authentication to allow fast, secure, and tamper-proof voting, making the process user-friendly and efficient. This system can streamline internal elections, reduce manual errors, and promote digital trust in voting practices.  By integrating cybersecurity measures with innovative QR technology and encryption using AES algorithm, the project addresses the need for a reliable online election system that can operate at scale while ensuring each vote is authentic and tamper-proof.

---

## Project Goals and Milestones
1. User Registration
Taking user details like name, secure voter ID, age and encrypting the details using Advanced encryption standard algorithm(AES).

2. QR Code Generation
Dynamically generating a unique QR code for each registered user containing their secure voter ID, enabling seamless identification during the voting process.

3. Two-Step Authentication
Implementing an additional layer of security through OTP (One-Time Password) verification to confirm the user's identity before granting access to the voting system.

4. Secure Vote Casting
Allowing only verified users to cast their vote through a secure interface, ensuring that each person can vote only once.

5. QR Code Expiry Mechanism
Each QR code will become invalid immediately after a successful vote is cast, preventing any reuse or tampering.

6. User-Friendly Interface
Featuring a clean, responsive, and intuitive user interface that guides voters smoothly from QR scanning to vote submission with minimal effort.

---

## Project Approach     
-Frontend Development:
Using  HTM,CSS,JS for the user interface, incorporating camera access for QR scanning and a secure voting panel.

-Encrypting Data
The user details will be secured using encryption through advanced encryption standard algorithm(AES).

-QR Code System:
Generate QR codes using libraries like qrcode.js in javascript, and scan the qr code using html5-qrcode library in javascript.

-Backend Development:
Integration with MongoDB or MySQL to store user credentials, voting data, and QR status.

-Authentication:
Use of time-limited OTP generated using javascript and sent via email/SMS through services like SMTP. OTP verification is required before the voting panel is accessible.

---

## Assumptions 
-Voters have access to a camera-enabled device

 -QR codes are secure and not shared among users

 -Voting is conducted in a controlled environment

-Every voter is having a unique voter ID.




