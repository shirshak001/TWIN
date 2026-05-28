import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

/**
 * File Processing Service
 * Handles extraction of data from uploaded documents
 */

/**
 * Extract text from PDF file
 */
export const extractTextFromPDF = async (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(fileBuffer);
    return data.text;
  } catch (error) {
    console.error('PDF extraction error:', error.message);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
};

/**
 * Extract text from plain text file
 */
export const extractTextFromFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
};

/**
 * Process Health Document
 * Extracts health metrics from medical reports
 */
export const processHealthDocument = async (filePath, mimeType) => {
  let text = '';
  
  if (mimeType === 'application/pdf') {
    text = await extractTextFromPDF(filePath);
  } else if (mimeType === 'text/plain') {
    text = extractTextFromFile(filePath);
  } else if (mimeType.startsWith('image/')) {
    // For images, we would use OCR (not implemented in this basic version)
    text = 'Image upload - OCR processing would occur here';
  }
  
  // Extract health metrics using regex patterns
  const healthData = {};
  
  // Blood Pressure extraction (format: 120/80)
  const bpMatch = text.match(/(?:BP|blood\s+pressure)?\s*(\d{2,3})\s*\/\s*(\d{2,3})/i);
  if (bpMatch) {
    healthData.bloodPressure = {
      systolic: parseInt(bpMatch[1]),
      diastolic: parseInt(bpMatch[2]),
    };
  }
  
  // Sugar/Glucose Level extraction
  const sugarMatch = text.match(/(?:glucose|sugar|blood\s+sugar)\s*[:\-=]?\s*(\d+(?:\.\d+)?)/i);
  if (sugarMatch) {
    healthData.sugarLevel = parseFloat(sugarMatch[1]);
  }
  
  // Cholesterol extraction
  const cholesterolMatch = text.match(/cholesterol\s*[:\-=]?\s*(\d+(?:\.\d+)?)/i);
  if (cholesterolMatch) {
    healthData.cholesterol = parseFloat(cholesterolMatch[1]);
  }
  
  // BMI extraction
  const bmiMatch = text.match(/BMI\s*[:\-=]?\s*(\d+(?:\.\d+)?)/i);
  if (bmiMatch) {
    healthData.bmi = parseFloat(bmiMatch[1]);
  }
  
  // Risk factors and deficiencies detection
  const riskKeywords = ['hypertension', 'diabetes', 'obesity', 'stress', 'anxiety'];
  const deficiencyKeywords = ['vitamin d', 'iron', 'b12', 'calcium', 'magnesium'];
  
  healthData.riskFactors = [];
  healthData.vitaminDeficiencies = [];
  
  riskKeywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword)) {
      healthData.riskFactors.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  });
  
  deficiencyKeywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword)) {
      healthData.vitaminDeficiencies.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  });
  
  return {
    extractedData: healthData,
    processedText: text.substring(0, 500), // First 500 chars for reference
    aiAnalysis: generateHealthAI(healthData),
  };
};

/**
 * Process Finance Document
 * Extracts financial metrics from bank statements and reports
 */
export const processFinanceDocument = async (filePath, mimeType) => {
  let text = '';
  
  if (mimeType === 'application/pdf') {
    text = await extractTextFromPDF(filePath);
  } else if (mimeType === 'text/plain' || mimeType === 'text/csv') {
    text = extractTextFromFile(filePath);
  } else if (mimeType.startsWith('image/')) {
    text = 'Image upload - OCR processing would occur here';
  }
  
  const financialData = {};
  
  // Income extraction
  const incomeMatch = text.match(/(?:salary|income|gross)\s*[:\-=]?\s*[\$₹]?\s*(\d+(?:,\d{3})*(?:\.\d+)?)/i);
  if (incomeMatch) {
    financialData.monthlyIncome = parseFloat(incomeMatch[1].replace(/,/g, ''));
  }
  
  // Expenses extraction
  const expensesMatch = text.match(/(?:expenses?|total\s+spent?)\s*[:\-=]?\s*[\$₹]?\s*(\d+(?:,\d{3})*(?:\.\d+)?)/i);
  if (expensesMatch) {
    financialData.monthlyExpenses = parseFloat(expensesMatch[1].replace(/,/g, ''));
  }
  
  // Spending categories
  const categoryKeywords = {
    'Food': ['grocery', 'restaurant', 'food', 'dining'],
    'Transportation': ['fuel', 'car', 'bus', 'taxi', 'travel'],
    'Utilities': ['electric', 'water', 'gas', 'internet'],
    'Entertainment': ['movie', 'games', 'music', 'streaming'],
    'Healthcare': ['hospital', 'doctor', 'medicine', 'pharmacy'],
  };
  
  financialData.spendingCategories = {};
  Object.entries(categoryKeywords).forEach(([category, keywords]) => {
    const count = keywords.filter(kw => text.toLowerCase().includes(kw)).length;
    if (count > 0) {
      financialData.spendingCategories[category] = count * 100; // Placeholder calculation
    }
  });
  
  // Risk factors
  financialData.financialRisks = [];
  if (text.toLowerCase().includes('debt')) {
    financialData.financialRisks.push('High Debt Levels');
  }
  if (text.toLowerCase().includes('overdraft')) {
    financialData.financialRisks.push('Frequent Overdrafts');
  }
  if (financialData.monthlyExpenses > financialData.monthlyIncome) {
    financialData.financialRisks.push('Spending Exceeds Income');
  }
  
  // Calculate savings rate
  if (financialData.monthlyIncome && financialData.monthlyExpenses) {
    financialData.savingsRate = (
      ((financialData.monthlyIncome - financialData.monthlyExpenses) / financialData.monthlyIncome) * 100
    ).toFixed(2);
  }
  
  return {
    extractedData: financialData,
    processedText: text.substring(0, 500),
    aiAnalysis: generateFinanceAI(financialData),
  };
};

/**
 * Process Career Document
 * Extracts career information from resumes and certificates
 */
export const processCareerDocument = async (filePath, mimeType) => {
  let text = '';
  
  if (mimeType === 'application/pdf') {
    text = await extractTextFromPDF(filePath);
  } else if (mimeType === 'text/plain') {
    text = extractTextFromFile(filePath);
  } else if (mimeType.startsWith('image/')) {
    text = 'Image upload - OCR processing would occur here';
  }
  
  const careerData = {};
  
  // Extract skills
  const skillKeywords = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'MongoDB',
    'SQL', 'AWS', 'Docker', 'Git', 'REST API', 'Machine Learning',
    'Data Analysis', 'Leadership', 'Project Management', 'Communication',
  ];
  
  careerData.skills = skillKeywords.filter(skill =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
  
  // Extract technologies
  const techKeywords = [
    'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django',
    'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Google Cloud',
    'Docker', 'Kubernetes', 'Git', 'CI/CD', 'Agile',
  ];
  
  careerData.technologies = techKeywords.filter(tech =>
    text.toLowerCase().includes(tech.toLowerCase())
  );
  
  // Extract certifications
  const certMatches = text.match(/(certified|certification|certificate).*?(?=\n|$)/gi) || [];
  careerData.certifications = certMatches.slice(0, 5);
  
  // Extract education
  const degreeMatches = text.match(/(bachelor|master|phd|degree|diploma).*?(?:in|of).*?(?=\n|,|$)/gi) || [];
  careerData.education = degreeMatches.join('; ') || 'Not specified';
  
  // Determine experience level
  const expMatch = text.match(/(\d+)\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|exp)/i);
  if (expMatch) {
    const years = parseInt(expMatch[1]);
    if (years < 2) {
      careerData.experienceLevel = 'Entry Level';
    } else if (years < 5) {
      careerData.experienceLevel = 'Mid Level';
    } else if (years < 10) {
      careerData.experienceLevel = 'Senior Level';
    } else {
      careerData.experienceLevel = 'Expert Level';
    }
    careerData.experience = `${years} years`;
  }
  
  return {
    extractedData: careerData,
    processedText: text.substring(0, 500),
    aiAnalysis: generateCareerAI(careerData),
  };
};

/**
 * Generate AI insights for health data
 */
const generateHealthAI = (data) => {
  const recommendations = [];
  const insights = [];
  
  if (data.bloodPressure) {
    const { systolic, diastolic } = data.bloodPressure;
    if (systolic > 140 || diastolic > 90) {
      recommendations.push('Consider consulting a cardiologist about blood pressure management');
      insights.push('High blood pressure detected - increase monitoring frequency');
    }
  }
  
  if (data.sugarLevel && data.sugarLevel > 126) {
    recommendations.push('Consult an endocrinologist for diabetes screening');
    insights.push('Elevated sugar levels - may indicate prediabetes');
  }
  
  if (data.riskFactors && data.riskFactors.length > 0) {
    recommendations.push(`Address identified risk factors: ${data.riskFactors.join(', ')}`);
  }
  
  return { insights, recommendations, correlations: [] };
};

/**
 * Generate AI insights for finance data
 */
const generateFinanceAI = (data) => {
  const recommendations = [];
  const insights = [];
  
  if (data.savingsRate < 10) {
    recommendations.push('Work on increasing savings rate - aim for at least 20% of income');
    insights.push('Low savings rate detected');
  }
  
  if (data.financialRisks && data.financialRisks.length > 0) {
    recommendations.push(`Address financial risks: ${data.financialRisks.join(', ')}`);
  }
  
  if (data.spendingCategories && Object.keys(data.spendingCategories).length > 0) {
    insights.push(`Multiple spending categories identified - create a detailed budget`);
  }
  
  return { insights, recommendations, correlations: [] };
};

/**
 * Generate AI insights for career data
 */
const generateCareerAI = (data) => {
  const recommendations = [];
  const insights = [];
  
  if (data.skills && data.skills.length > 5) {
    insights.push('Strong diverse skill set detected');
  }
  
  if (data.skills && data.skills.length < 3) {
    recommendations.push('Consider acquiring more technical skills for career growth');
  }
  
  if (data.experienceLevel) {
    insights.push(`${data.experienceLevel} professional profile`);
  }
  
  if (data.technologies && data.technologies.length > 3) {
    recommendations.push('Leverage your diverse tech stack for freelancing opportunities');
  }
  
  return { insights, recommendations, correlations: [] };
};

/**
 * Main processor function based on category
 */
export const processDocument = async (filePath, category, mimeType) => {
  console.log(`Processing ${category} document: ${filePath}`);
  
  try {
    switch (category) {
      case 'health':
        return await processHealthDocument(filePath, mimeType);
      case 'finance':
        return await processFinanceDocument(filePath, mimeType);
      case 'career':
        return await processCareerDocument(filePath, mimeType);
      default:
        throw new Error(`Unknown category: ${category}`);
    }
  } catch (error) {
    console.error('Document processing error:', error);
    throw error;
  }
};

export default {
  processDocument,
  processHealthDocument,
  processFinanceDocument,
  processCareerDocument,
};
