/**
 * BanksCart Ralph Adapter for Antigravity IDE
 *
 * Provides Ralph-style PRD-driven iterative development while maintaining
 * strict execution control inside Antigravity without unvetted external bash loops.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PRD_FILE = path.join(process.cwd(), 'prd.json');
const PROGRESS_FILE = path.join(process.cwd(), 'progress.txt');

function loadPRD() {
  if (!fs.existsSync(PRD_FILE)) {
    const templatePath = path.join(__dirname, 'template.prd.json');
    if (fs.existsSync(templatePath)) {
      fs.copyFileSync(templatePath, PRD_FILE);
      console.log('Created prd.json from template.');
    } else {
      console.error('prd.json not found and template missing.');
      process.exit(1);
    }
  }
  return JSON.parse(fs.readFileSync(PRD_FILE, 'utf-8'));
}

function savePRD(prd) {
  prd.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PRD_FILE, JSON.stringify(prd, null, 2) + '\n', 'utf-8');
}

function logProgress(entry) {
  const line = `[${new Date().toISOString()}] ${entry}\n`;
  fs.appendFileSync(PROGRESS_FILE, line, 'utf-8');
}

const command = process.argv[2] || 'status';

if (command === 'status') {
  const prd = loadPRD();
  console.log(`\n=== BanksCart Ralph PRD Status: ${prd.project} (${prd.phase}) ===`);
  const total = prd.userStories.length;
  const completed = prd.userStories.filter(s => s.passes).length;
  console.log(`Progress: ${completed}/${total} stories passing (${Math.round((completed/total)*100 || 0)}%)\n`);

  prd.userStories.forEach((s, idx) => {
    const icon = s.passes ? '✅ [PASS]' : '⏳ [PENDING]';
    console.log(`${idx + 1}. ${icon} ${s.id}: ${s.title}`);
    if (s.targetFiles && s.targetFiles.length > 0) {
      console.log(`   Files: ${s.targetFiles.join(', ')}`);
    }
  });
  console.log('');
} else if (command === 'next') {
  const prd = loadPRD();
  const nextStory = prd.userStories.find(s => !s.passes);
  if (!nextStory) {
    console.log('\n🎉 All user stories in prd.json have passed! Milestone complete.\n');
  } else {
    console.log('\n======================================================');
    console.log(`  NEXT STORY TO IMPLEMENT: ${nextStory.id} - ${nextStory.title}`);
    console.log('======================================================\n');
    console.log(`Description:\n  ${nextStory.description}\n`);
    console.log(`Target Files:\n  ${(nextStory.targetFiles || []).join(', ')}\n`);
    console.log('Acceptance Criteria:');
    (nextStory.acceptanceCriteria || []).forEach((c, i) => {
      console.log(`  [ ] ${i + 1}. ${c}`);
    });
    console.log(`\nVerification Command:\n  ${nextStory.verificationCommand || 'npm test && npx tsc --noEmit'}\n`);
  }
} else if (command === 'verify') {
  const prd = loadPRD();
  const storyId = process.argv[3];
  const story = storyId
    ? prd.userStories.find(s => s.id === storyId)
    : prd.userStories.find(s => !s.passes);

  if (!story) {
    console.log('No matching uncompleted story found to verify.');
    process.exit(0);
  }

  const verifyCmd = story.verificationCommand || 'npm test && npx tsc --noEmit';
  console.log(`\nVerifying ${story.id}: "${story.title}" using "${verifyCmd}"...`);

  try {
    execSync(verifyCmd, { stdio: 'inherit' });
    story.passes = true;
    savePRD(prd);
    logProgress(`COMPLETED ${story.id}: ${story.title}`);
    console.log(`\n✅ Story ${story.id} successfully verified and marked as PASS in prd.json!`);
  } catch (err) {
    console.error(`\n❌ Verification failed for ${story.id}. Please fix errors before marking as PASS.`);
    process.exit(1);
  }
} else {
  console.log(`Unknown command: ${command}`);
  console.log('Usage: node scripts/ralph/ralph-runner.cjs [status|next|verify]');
}
