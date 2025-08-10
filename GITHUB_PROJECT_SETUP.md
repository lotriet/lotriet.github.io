# GitHub Project Setup Guide

## 🎯 Creating the Portfolio Management Project

### Quick Setup Steps:

1. **Navigate to Projects**

   ```
   https://github.com/lotriet/lotriet.github.io/projects
   ```

2. **Create New Project**

   - Click "New project"
   - Choose "Board" layout
   - Name: "Portfolio Management"
   - Description: "Managing development and maintenance of professional portfolio website"

3. **Set Up Columns**

   ```
   📋 Backlog        - New issues, ideas, future enhancements
   🔄 In Progress    - Currently being worked on
   👀 Review         - Completed, waiting for testing/approval
   ✅ Done          - Completed and deployed
   ```

4. **Configure Labels** (Repository Settings > Labels)

   ```
   🏷️ Type Labels:
   - enhancement (green)
   - bug (red)
   - content (blue)
   - design (purple)
   - documentation (yellow)

   🏷️ Priority Labels:
   - priority:high (red)
   - priority:medium (orange)
   - priority:low (yellow)

   🏷️ Area Labels:
   - mobile (pink)
   - accessibility (brown)
   - performance (grey)
   ```

5. **Create Initial Issues**
   Use the issue templates in `.github/ISSUE_TEMPLATE/` to create:
   - Portfolio project additions
   - Content updates needed
   - Design improvements
   - Bug fixes

## 🚀 Sample Issues to Create

### Feature Issues:

1. **[FEATURE] Add real portfolio projects**

   - Priority: High
   - Milestone: V1.2
   - Labels: enhancement, content

2. **[FEATURE] Implement project filtering**
   - Priority: Medium
   - Milestone: V1.2
   - Labels: enhancement, design

### Content Issues:

1. **[CONTENT] Update with latest work experience**

   - Priority: High
   - Labels: content, priority:high

2. **[CONTENT] Add project screenshots and descriptions**
   - Priority: Medium
   - Labels: content, portfolio

### Design Issues:

1. **[DESIGN] Improve mobile responsiveness**
   - Priority: Medium
   - Labels: design, mobile

## 📊 Project Board Workflow

### Moving Cards:

- **Backlog → In Progress**: When you start working on an issue
- **In Progress → Review**: When development is complete
- **Review → Done**: When tested and deployed
- **Done**: Archive after 2 weeks

### Automation Rules:

- Issues automatically move to "In Progress" when assigned
- Pull requests move to "Review" when opened
- Issues move to "Done" when closed

## 🎯 Milestones Integration

Link issues to milestones:

- **V1.2 - Portfolio Enhancement** (Next 2 weeks)
- **V1.3 - Content Management** (Next month)
- **V2.0 - Advanced Features** (Next quarter)

## 📈 Using the Project

1. **Weekly Review**: Check progress, update priorities
2. **Issue Triage**: Add new issues to backlog
3. **Sprint Planning**: Move items from backlog to in progress
4. **Release Planning**: Group issues by milestone
