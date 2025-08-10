# 🌐 Custom Domain Setup Guide for lotriet.github.io

## 📋 Step-by-Step Domain Setup Process

### Phase 1: Domain Purchase (Recommended: Namecheap)

#### 🛒 **Buying Your Domain**
1. **Go to Namecheap.com**
2. **Search for your preferred domain:**
   - `lotriet.com` (recommended)
   - `christolo.com` 
   - `christolotriet.com`
   - Check availability and pricing

3. **Complete Purchase:**
   - Add to cart
   - Create account or login
   - Complete payment (~$8-12 for first year)

### Phase 2: GitHub Pages Configuration

#### ⚙️ **GitHub Repository Settings**
1. **Go to your repository:** `https://github.com/lotriet/lotriet.github.io`
2. **Click Settings tab**
3. **Scroll down to "Pages" section**
4. **Under "Custom domain":**
   - Enter your new domain (e.g., `lotriet.com`)
   - Click "Save"
5. **Check "Enforce HTTPS"** (wait for it to become available)

#### 📄 **Create CNAME File**
GitHub will auto-create this, but here's the manual method:

```
# Create CNAME file in repository root
echo "lotriet.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

### Phase 3: DNS Configuration (Namecheap)

#### 🔧 **DNS Records Setup**

**For Apex Domain (lotriet.com):**
```
Type: A
Host: @
Value: 185.199.108.153
TTL: Automatic

Type: A  
Host: @
Value: 185.199.109.153
TTL: Automatic

Type: A
Host: @
Value: 185.199.110.153
TTL: Automatic

Type: A
Host: @
Value: 185.199.111.153
TTL: Automatic
```

**For WWW Subdomain:**
```
Type: CNAME
Host: www
Value: lotriet.github.io.
TTL: Automatic
```

#### 📝 **Namecheap Dashboard Steps:**
1. **Login to Namecheap**
2. **Go to Domain List**
3. **Click "Manage" next to your domain**
4. **Go to "Advanced DNS" tab**
5. **Delete existing A records**
6. **Add the GitHub Pages A records above**
7. **Add the CNAME record for www**
8. **Save changes**

### Phase 4: Verification & Testing

#### ✅ **Check Domain Propagation**
- Use online tools like `whatsmydns.net`
- Enter your domain and check A records
- Wait 10-60 minutes for DNS propagation

#### 🧪 **Test Your Setup**
```bash
# Test domain resolution
nslookup lotriet.com

# Test website access
curl -I https://lotriet.com
```

#### 🔍 **Verify GitHub Pages**
1. **Go back to GitHub Pages settings**
2. **Confirm custom domain shows your domain**
3. **Ensure "Enforce HTTPS" is checked and working**

### Phase 5: Final Configuration

#### 🔒 **SSL Certificate**
- GitHub automatically provides SSL via Let's Encrypt
- Wait 15-30 minutes after DNS propagation
- Your site should be accessible via `https://lotriet.com`

#### 🔄 **Redirect Setup**
Both of these should work:
- `http://lotriet.com` → `https://lotriet.com`
- `https://www.lotriet.com` → `https://lotriet.com`

## 🚨 Common Issues & Solutions

### Problem: "Domain's DNS record could not be retrieved"
**Solution:** 
- Check DNS records are correct
- Wait longer for propagation (up to 24 hours)
- Verify A records point to GitHub's IPs

### Problem: "Domain is not properly configured"
**Solution:**
- Ensure CNAME file exists in repository
- Check custom domain in GitHub settings
- Verify DNS propagation

### Problem: SSL not working
**Solution:**
- Uncheck "Enforce HTTPS" temporarily
- Wait for propagation
- Re-enable "Enforce HTTPS"

## 📞 Need Help?

If you run into issues, I can help you:
1. **Debug DNS records**
2. **Check GitHub Pages configuration** 
3. **Troubleshoot SSL issues**
4. **Verify domain propagation**

## 🎯 Expected Timeline

- **Domain purchase:** 5 minutes
- **GitHub configuration:** 5 minutes  
- **DNS setup:** 10 minutes
- **Propagation wait:** 15-60 minutes
- **SSL activation:** 15-30 minutes after propagation

**Total time:** ~1-2 hours (mostly waiting for DNS)

## 📋 Quick Checklist

- [ ] Domain purchased from Namecheap
- [ ] Custom domain added in GitHub Pages settings
- [ ] CNAME file created in repository
- [ ] A records configured in Namecheap DNS
- [ ] WWW CNAME record added
- [ ] DNS propagation verified
- [ ] HTTPS enforced and working
- [ ] Both www and non-www versions redirect properly

---

**Ready to start? Let me know when you've purchased your domain and I'll help you configure everything!**
