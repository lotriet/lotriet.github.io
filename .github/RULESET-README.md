# Repository Ruleset Configuration

## Active Rulesets

### 1. Global Protection Ruleset
**Status:** Active
**Scope:** All branches (`~ALL`)
**ID:** 9036995

#### Protection Rules

1. **Branch Deletion Protection**
   - Prevents accidental deletion of branches
   - Type: `deletion`

2. **Force Push Protection**
   - Blocks force pushes to maintain commit history
   - Type: `non_fast_forward`

3. **Required Commit Signatures**
   - All commits must be signed (GPG/SSH signatures)
   - Type: `required_signatures`
   - Note: You may need to configure commit signing in your git config

4. **Pull Request Reviews**
   - Requires code owner approval (via CODEOWNERS file)
   - Type: `pull_request`
   - Parameters:
     - `require_code_owner_review`: true
     - `required_approving_review_count`: 0
     - Allowed merge methods: merge, squash, rebase

#### Bypass Actors
- Repository administrators can bypass these rules when necessary
- Bypass mode: always (for emergency fixes)

### 2. Basic Protection
**Status:** Active
**ID:** 9036524
- Branch deletion protection
- Force push protection

## How to Work with These Rules

### For Direct Commits (Repository Owner)
Since you have bypass privileges, you can still push directly to main when needed. However, best practices recommend:

1. Create feature branches for changes
2. Test thoroughly before merging
3. Use signed commits

### Setting Up Commit Signing

#### GPG Signing
```bash
# Generate GPG key
gpg --full-generate-key

# List keys
gpg --list-secret-keys --keyid-format=long

# Configure git to use GPG
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
```

#### SSH Signing (Recommended for GitHub)
```bash
# Use your existing SSH key
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```

### Managing Rulesets

#### View All Rulesets
```bash
gh api repos/lotriet/lotriet.github.io/rulesets
```

#### View Specific Ruleset Details
```bash
gh api repos/lotriet/lotriet.github.io/rulesets/9036995
```

#### Update Ruleset
```bash
gh api -X PUT repos/lotriet/lotriet.github.io/rulesets/9036995 \
  --input .github/ruleset-config.json
```

#### Delete a Ruleset
```bash
gh api -X DELETE repos/lotriet/lotriet.github.io/rulesets/RULESET_ID
```

## Ruleset Configuration File

The ruleset configuration is stored in [.github/ruleset-config.json](.github/ruleset-config.json) for reference and version control.

## Web Interface

You can also manage rulesets via GitHub's web interface:
- Navigate to: https://github.com/lotriet/lotriet.github.io/settings/rules
- View, edit, or create new rulesets
- Monitor ruleset activity and bypass events

## Benefits

1. **Prevents Accidental Data Loss:** No force pushes or branch deletions
2. **Code Review Enforcement:** Ensures code owner approval via CODEOWNERS
3. **Security:** Requires signed commits for authenticity
4. **Flexibility:** Admin bypass for emergency situations
5. **Global Coverage:** Applies to all branches automatically

## Next Steps

1. Configure commit signing on your local machine
2. Consider adding status check requirements if you add CI/CD workflows
3. Review bypass events periodically to ensure proper usage
4. Consider creating branch-specific rulesets for additional control

---

Last Updated: 2025-10-20
