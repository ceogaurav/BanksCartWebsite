import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Resend } from "resend";

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Resend with your API Key
// BEST PRACTICE: Use firebase secrets, but for now hardcode or use process.env
const resend = new Resend("re_YYDQm2iF_3vQ7hgG2KMdwH461B2X9BvTF"); // REPLACE WITH YOUR RESEND API KEY

// =========================================================
// 1. WELCOME EMAIL TRIGGER (Runs when user creates account)
// =========================================================
export const sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  const email = user.email;
  const displayName = user.displayName || "User";

  if (!email) {
    console.log("No email found for user, skipping welcome email.");
    return;
  }

  try {
    await resend.emails.send({
      from: "BanksCart <onboarding@bankscart.com>", // Must verify domain in Resend
      to: email,
      subject: "Welcome to BanksCart! 🚀",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome, ${displayName} to Bankscart</title>
</head>

<body style="margin:0;padding:0;background:#2b7dbd;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#2b7dbd;">
<tr>
<td align="center" style="padding:30px 10px;">

<!-- CARD -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;">

<!-- LOGO -->
<tr>
<td align="center" style="padding:25px;">
<img src="https://www.bankscart.com/logos/bankscartlogof.jpg"
     alt="Bankscart"
     width="180"
     style="display:block;">
</td>
</tr>

<!-- HERO -->
<tr>
<td align="center" style="padding:0 30px;">
<h1 style="color:#1e88e5;font-size:32px;margin:10px 0;">
Welcome to Bankscart — Your Smarter Way to Borrow
</h1>
<p style="color:#555;font-size:15px;line-height:24px;">
Compare loan offers, check your CIBIL score for free, and unlock the best interest
rates from India’s top banks — all in one secure platform.
</p>
</td>
</tr>

<tr>
<td style="padding:20px 30px;">
<hr style="border:none;border-top:1px solid #e5e5e5;">
</td>
</tr>

<!-- MAIN SECTION -->
<tr>
<td style="padding:10px 30px;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>

<!-- LEFT CONTENT -->
<td width="45%" valign="top">
<h2 style="font-size:18px;color:#000;margin-bottom:10px;">
Know Your Credit. Unlock Better Loans.
</h2>

<p style="font-size:15px;color:#333;line-height:22px;">
Your <strong>CIBIL score</strong> plays a crucial role in loan approvals,
interest rates, and eligibility with top banks.
</p>

<p style="font-size:15px;color:#333;line-height:22px;">
Check your score instantly — <strong>100% free, secure, and impact-free</strong> —
and discover loan offers tailored just for you.
</p>

<!-- CTA -->
<a href="https://www.bankscart.com/cibil-score"
style="display:inline-block;
margin-top:20px;
padding:14px 32px;
background:#1e88e5;
color:#ffffff;
text-decoration:none;
border-radius:5px;
font-size:15px;
font-weight:bold;">
Check Your Free CIBIL Score
</a>

<p style="font-size:12px;color:#777;margin-top:8px;">
No impact on your credit score • 100% secure
</p>
</td>

<!-- RIGHT IMAGE -->
<td width="55%" align="right" valign="top" style="padding-top:5px;">
<img src="https://img.freepik.com/free-photo/attractive-enthusiastic-armenian-young-woman-curly-hair-pointing-looking-intrigued-left-show-index-fingers-awesome-blank-space-advertisement-smirking-joyfully-introducing-product-white-background_176420-35016.jpg?semt=ais_hybrid&w=740&q=80"
     alt="Check CIBIL Score"
     width="340"
     style="display:block;width:100%;max-width:340px;height:auto;">
</td>

</tr>
</table>
</td>
</tr>

<!-- FEATURES -->
<tr>
<td style="background:#e3f0fb;padding:32px 20px;">
<h3 style="text-align:center;color:#444;margin-bottom:25px;">
Everything You Need to Make Smarter Loan Decisions
</h3>

<table width="100%" cellpadding="0" cellspacing="0">
<tr align="center">

<td width="25%">
<img src="https://cdn-icons-png.flaticon.com/512/3135/3135679.png" width="46">
<p style="font-size:13px;margin-top:8px;"><strong>Compare Best Loan Rates</strong></p>
</td>

<td width="25%">
<img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" width="46">
<p style="font-size:13px;margin-top:8px;"><strong>Apply with Top Banks</strong></p>
</td>

<td width="25%">
<img src="https://cdn-icons-png.flaticon.com/512/1041/1041881.png" width="46">
<p style="font-size:13px;margin-top:8px;"><strong>Plan EMIs Smartly</strong></p>
</td>

<td width="25%">
<img src="https://cdn-icons-png.flaticon.com/512/3143/3143643.png" width="46">
<p style="font-size:13px;margin-top:8px;"><strong>Expert Financial Insights</strong></p>
</td>

</tr>
</table>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td align="center" style="padding:20px;font-size:12px;color:#666;">
Trusted by borrowers across India<br><br>

<a href="https://www.bankscart.com"
style="color:#1e88e5;text-decoration:none;">
Visit Bankscart.com
</a>
&nbsp;|&nbsp;
<a href="#" style="color:#1e88e5;text-decoration:none;">
Unsubscribe
</a>
</td>
</tr>

</table>
<!-- END CARD -->

</td>
</tr>
</table>

</body>
</html>
      `,
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
});

// =========================================================
// 2. CREDIT SCORE TRIGGER (Runs when report is saved to DB)
// =========================================================
// This watches the path: users/{userId}/creditReports/{reportId}
export const sendCreditScoreEmail = functions.firestore
  .document("users/{userId}/creditReports/{reportId}")
  .onCreate(async (snap, context) => {
    const reportData = snap.data();
    const userId = context.params.userId;

    // 1. Get User Email & Details (Fetch from Auth & Firestore Profile)
    let email = "";
    let name = "User";
    let monthlyIncome = 0;

    try {
      // Fetch Auth Data
      const userRecord = await admin.auth().getUser(userId);
      email = userRecord.email || "";
      name = userRecord.displayName || "User";

      // Fetch Firestore Profile Data for Income
      const userDoc = await admin.firestore().collection("users").doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        // Check both potential locations for income based on EmploymentDetails.tsx
        const incomeStr = userData?.employmentDetails?.monthlyIncome || "0";
        monthlyIncome = parseInt(String(incomeStr).replace(/,/g, ""), 10) || 0;
      }

    } catch (e) {
      console.log("Error fetching user details", e);
      return; // Can't send email if we don't know who it is
    }

    const score = reportData.credit_score || "N/A";
    let color = "#ef4444"; // Red
    if (parseInt(score) > 750) color = "#22c55e"; // Green
    else if (parseInt(score) > 700) color = "#eab308"; // Yellow

    // Calculate Pre-Approved Offer
    // Default to 5L if no income found, otherwise Income * 25
    const loanAmountRaw = monthlyIncome > 0 ? monthlyIncome * 25 : 500000;

    const loanAmountFormatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(loanAmountRaw);

    try {
      await resend.emails.send({
        from: "BanksCart Alerts <alerts@bankscart.com>",
        to: email,
        subject: `Your New Credit Score is ${score}`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Your Pre-Approved Loan – Bankscart</title>
</head>

<body style="margin:0;padding:0;background:#3a2b82;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#3a2b82;">
<tr>
<td align="center" style="padding:30px 10px;">

<!-- CARD -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#4b3bbd;border-radius:12px;overflow:hidden;">

<!-- LOGO -->
<tr>
<td align="center" style="padding:22px;">
<img src="https://www.bankscart.com/logos/bankscartlogof.jpg"
     alt="Bankscart"
     width="160"
     style="display:block;">
</td>
</tr>

<!-- HERO CONTENT -->
<tr>
<td style="padding:25px 30px;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>

<!-- LEFT CONTENT -->
<td width="58%" valign="top">

<p style="color:#ffcc00;font-size:14px;font-weight:bold;margin:0 0 6px;">
Hello ${name},
</p>

<h1 style="color:#ffffff;font-size:28px;line-height:34px;margin:0 0 12px;">
Your Credit Score Just
Unlocked a Loan Offer 🎉
</h1>

<p style="color:#e6e6ff;font-size:15px;line-height:22px;margin-bottom:18px;">
Your latest credit report has been generated successfully.
Based on your profile, you’re eligible for an exclusive
<strong>pre-approved personal loan</strong>.
</p>

<!-- SCORE -->
<div style="background:#3a2b82;padding:18px;border-radius:10px;text-align:center;margin-bottom:18px;">
<p style="margin:0;font-size:14px;color:#c7c7ff;">Your CIBIL Score</p>
<h2 style="margin:5px 0 0;font-size:42px;color:${color};">
${score}
</h2>
</div>

<!-- OFFER -->
<div style="background:#ffffff;padding:18px;border-radius:10px;text-align:center;">
<p style="font-size:16px;color:#333;margin:0 0 8px;">
You are pre-approved for
</p>
<h2 style="margin:0;font-size:26px;color:#ea580c;">
${loanAmountFormatted}
</h2>

<a href="https://www.bankscart.com/dashboard?openOffer=true"
style="display:inline-block;
margin-top:16px;
padding:14px 34px;
background:#ffcc00;
color:#000;
text-decoration:none;
border-radius:30px;
font-size:16px;
font-weight:bold;">
Claim Now →
</a>

<p style="font-size:11px;color:#777;margin-top:10px;">
*Offer calculated based on your credit profile. T&C apply.
</p>
</div>

</td>

<!-- RIGHT IMAGE -->
<td width="42%" align="right" valign="middle">
<img src="https://cdn-icons-png.flaticon.com/128/4302/4302083.png"
     alt="Loan Approved"
     width="230"
     style="display:block;width:100%;max-width:230px;height:auto;">
</td>

</tr>
</table>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td align="center" style="background:#3a2b82;padding:16px;font-size:12px;color:#dcdcff;">
<a href="https://www.bankscart.com/profile?tab=credit-score"
   style="color:#ffcc00;text-decoration:none;font-weight:bold;">
View Full Credit Report
</a>
<br><br>
Compare • Apply • Save More with Bankscart
</td>
</tr>

</table>
<!-- END CARD -->

</td>
</tr>
</table>

</body>
</html>
      `,
      });
      console.log(`Credit score email sent to ${email} with offer ${loanAmountFormatted}`);
    } catch (error) {
      console.error("Error sending credit score email:", error);
    }
  });

// =========================================================
// 3. ADMIN NOTIFICATION TRIGGER (Runs when user applies)
// =========================================================
// Listens to: artifacts/{appId}/public/data/loanApplications/{docId}
export const sendAdminLoanAlert = functions.firestore
  .document("artifacts/{appId}/public/data/loanApplications/{applicationId}")
  .onCreate(async (snap, context) => {
    const appData = snap.data();
    // const appId = context.params.appId; 

    // 1. Prepare Admin Email Content
    const adminEmail = "admin@bankscart.com"; // REPLACE WITH YOUR ADMIN EMAIL

    // Format currency
    const amount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(appData.desiredAmount || 0);

    try {
      // 2. Send Email to Admin via Resend
      await resend.emails.send({
        from: "BanksCart System <system@bankscart.com>",
        to: adminEmail,
        subject: `🔔 New Loan Application: ${appData.fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #1e3a8a;">New Loan Application Received</h2>
            <p><strong>Customer:</strong> ${appData.fullName}</p>
            <p><strong>Amount Requested:</strong> ${amount}</p>
            <p><strong>Loan Type:</strong> ${appData.loanType}</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            
            <h3>Contact Details</h3>
            <ul>
                <li><strong>Email:</strong> ${appData.email}</li>
                <li><strong>Phone:</strong> ${appData.phoneNumber}</li>
                <li><strong>User ID:</strong> ${appData.userId}</li>
            </ul>

            <br/>
            <div style="text-align: center;">
                <a href="https://www.bankscart.com/admin/loans" 
                   style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                   Review Application in Admin Panel
                </a>
            </div>
          </div>
        `,
      });
      console.log(`Admin alert sent for application: ${context.params.applicationId}`);
    } catch (error) {
      console.error("Error sending admin alert:", error);
    }
  });
