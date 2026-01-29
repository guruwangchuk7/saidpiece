# 🔧 Google OAuth Redirect URI Fix - For Your Project

## Your Supabase Project Details

**Project Reference**: `ckxqgtfgghanvtvytjuz`
**Supabase URL**: `https://ckxqgtfgghanvtvytjuz.supabase.co`

---

## ✅ **EXACT Redirect URI You Need**

Copy this EXACT URL and use it in Google Cloud Console:

```
https://ckxqgtfgghanvtvytjuz.supabase.co/auth/v1/callback
```

⚠️ **IMPORTANT**: Copy the entire line above - every character matters!

---

## 📋 **Step-by-Step Fix**

### **Step 1: Verify in Supabase Dashboard**

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: **ckxqgtfgghanvtvytjuz**
3. Click **Authentication** (🔐 icon)
4. Click **Providers**
5. Click on **Google** to expand
6. Verify the **"Callback URL (for OAuth)"** shows:
   ```
   https://ckxqgtfgghanvtvytjuz.supabase.co/auth/v1/callback
   ```

### **Step 2: Update Google Cloud Console**

1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Select your project (top left dropdown)
3. Go to **APIs & Services** → **Credentials**
4. Find your **OAuth 2.0 Client ID**
5. Click the **✏️ (Edit)** icon
6. Scroll to **"Authorized redirect URIs"**
7. **REMOVE** any existing URIs that don't match
8. Click **"+ ADD URI"**
9. Paste this EXACT URL:
   ```
   https://ckxqgtfgghanvtvytjuz.supabase.co/auth/v1/callback
   ```
10. Click **"SAVE"** at the bottom

### **Step 3: Also Add Authorized JavaScript Origins**

While you're in the same edit screen:

1. Scroll to **"Authorized JavaScript origins"**
2. Click **"+ ADD URI"**
3. Add these two:
   ```
   http://localhost:5173
   ```
   ```
   https://ckxqgtfgghanvtvytjuz.supabase.co
   ```
4. Click **"SAVE"**

### **Step 4: Wait and Test**

1. **Wait 2-3 minutes** for Google to propagate changes
2. **Close all browser tabs** with your app
3. **Clear browser cache** or use **Incognito/Private mode**
4. Go to `http://localhost:5173/team`
5. Click on a protected team member
6. Click **"Continue with Google"**
7. Try signing in again

---

## 🔍 **Debugging Checklist**

### **In Google Cloud Console:**

- [ ] Authorized redirect URIs contains:
  ```
  https://ckxqgtfgghanvtvytjuz.supabase.co/auth/v1/callback
  ```
- [ ] No typos (check every character)
- [ ] No trailing slash at the end
- [ ] Uses `https://` not `http://`
- [ ] Saved successfully (green checkmark)

### **In Supabase Dashboard:**

- [ ] Google provider is **enabled** (toggle is ON/green)
- [ ] Client ID is filled in
- [ ] Client Secret is filled in
- [ ] Callback URL shows: `https://ckxqgtfgghanvtvytjuz.supabase.co/auth/v1/callback`

### **In Your Code:**

- [ ] `.env` file has correct Supabase URL
- [ ] Dev server was restarted after changing `.env`
- [ ] No errors in browser console

---

## 🎯 **Common Mistakes to Avoid**

### ❌ **Wrong:**
```
https://ckxqgtfgghanvtvytjuz.supabase.co/auth/v1/callback/
                                                         ↑ extra slash
```

### ❌ **Wrong:**
```
https://ckxqgtfgghanvtvytjuz.supabase.co/auth/callback
                                              ↑ missing v1
```

### ❌ **Wrong:**
```
http://ckxqgtfgghanvtvytjuz.supabase.co/auth/v1/callback
↑ http instead of https
```

### ✅ **Correct:**
```
https://ckxqgtfgghanvtvytjuz.supabase.co/auth/v1/callback
```

---

## 🔴 **Still Getting Error?**

### **Check the Error Details:**

1. When you see the Google error page
2. Click **"error details"** link
3. Look for the line that says:
   ```
   redirect_uri: https://...
   ```
4. Copy that EXACT URL
5. Make sure it matches what's in Google Cloud Console

### **Screenshot Your Settings:**

If still not working, check:

1. **Google Cloud Console** → Credentials → Your OAuth Client
   - Take a screenshot of "Authorized redirect URIs" section
   
2. **Supabase Dashboard** → Authentication → Providers → Google
   - Take a screenshot of the callback URL

Compare them - they MUST be identical.

---

## 💡 **Alternative: Test with Email/Password First**

While debugging Google OAuth, you can still test the auth system:

1. Go to `/team`
2. Click on a protected member
3. Click **"create a new account"**
4. Use email/password signup
5. Check your email for confirmation
6. This will verify your Supabase setup is working

Once email auth works, we know the issue is just the Google redirect URI configuration.

---

## 📞 **Need More Help?**

Share these details:
1. Screenshot of Google Cloud Console redirect URIs
2. Screenshot of Supabase Google provider settings
3. The exact error message from Google
4. Any errors in browser console (F12)

---

**Your correct redirect URI is:**
```
https://ckxqgtfgghanvtvytjuz.supabase.co/auth/v1/callback
```

Copy this and paste it EXACTLY in Google Cloud Console! 🎯
