export function calculateATSScore(analysis) {
    let score = 0;

    // ==========================================
    // Skills (25)
    // ==========================================
    const skills = analysis.skills?.length || 0;

    if (skills >= 15) score += 25;
    else if (skills >= 12) score += 22;
    else if (skills >= 10) score += 20;
    else if (skills >= 8) score += 16;
    else if (skills >= 5) score += 12;
    else if (skills >= 3) score += 8;
    else if (skills >= 1) score += 4;

    // ==========================================
    // Experience (20)
    // ==========================================
    const experience = analysis.experience?.length || 0;

    if (experience >= 3) score += 20;
    else if (experience === 2) score += 18;
    else if (experience === 1) score += 14;

    // ==========================================
    // Projects (20)
    // ==========================================
    const projects = analysis.projects?.length || 0;

    if (projects >= 4) score += 20;
    else if (projects === 3) score += 18;
    else if (projects === 2) score += 15;
    else if (projects === 1) score += 10;

    // ==========================================
    // Education (10)
    // ==========================================
    if ((analysis.education?.length || 0) > 0) {
        score += 10;
    }

    // ==========================================
    // Contact Information (10)
    // ==========================================
    let contactScore = 0;

    if (analysis.contact?.email) contactScore += 2;
    if (analysis.contact?.phone) contactScore += 2;
    if (analysis.contact?.linkedin) contactScore += 2;
    if (analysis.contact?.github) contactScore += 2;
    if (analysis.contact?.portfolio) contactScore += 2;

    score += contactScore;

    // ==========================================
    // Resume Formatting (10)
    // ==========================================
    score += Math.min(
        analysis.formatting?.score || 0,
        10
    );

    // ==========================================
    // Strengths (10)
    // ==========================================
    const strengths = analysis.strengths?.length || 0;

    score += Math.min(strengths * 2, 10);

    // ==========================================
    // Missing Skills Penalty (-10 max)
    // ==========================================
    const missingSkills =
        analysis.missingSkills?.length || 0;

    score -= Math.min(missingSkills, 10);

    // ==========================================
    // Basic Resume Quality Penalties
    // ==========================================

    if (projects === 0) score -= 10;

    if (experience === 0) score -= 8;

    if ((analysis.education?.length || 0) === 0)
        score -= 5;

    if (skills < 5) score -= 5;

    // ==========================================
    // Final Score
    // ==========================================
    score = Math.max(0, Math.min(score, 100));

    return Math.round(score);
}