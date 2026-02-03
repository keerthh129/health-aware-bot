-- Create diseases table for knowledge base
CREATE TABLE public.diseases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  symptoms JSONB NOT NULL DEFAULT '[]'::jsonb,
  causes JSONB NOT NULL DEFAULT '[]'::jsonb,
  prevention JSONB NOT NULL DEFAULT '[]'::jsonb,
  when_to_consult TEXT NOT NULL,
  keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;

-- Allow public read access to diseases (awareness content should be accessible to all)
CREATE POLICY "Anyone can view diseases" 
ON public.diseases 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_diseases_updated_at
BEFORE UPDATE ON public.diseases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial disease data
INSERT INTO public.diseases (name, description, symptoms, causes, prevention, when_to_consult, keywords) VALUES
(
  'Dengue',
  'Dengue is a viral infection transmitted by Aedes mosquitoes, commonly found in tropical and subtropical regions. It can range from mild fever to severe, potentially fatal conditions like dengue hemorrhagic fever.',
  '["High fever (40°C/104°F)", "Severe headache", "Pain behind the eyes", "Muscle and joint pain", "Nausea and vomiting", "Skin rash appearing 2-5 days after fever", "Mild bleeding (nose or gums)", "Fatigue"]',
  '["Bite from infected Aedes aegypti mosquito", "Aedes albopictus mosquito (secondary vector)", "Transmission occurs during daytime, especially around dawn and dusk", "Stagnant water provides breeding grounds for mosquitoes"]',
  '["Use mosquito repellents containing DEET, picaridin, or oil of lemon eucalyptus", "Wear long-sleeved shirts and long pants", "Use window screens and mosquito nets", "Remove stagnant water from containers, tires, and flowerpots", "Keep surroundings clean and dry", "Use air conditioning when available", "Avoid outdoor activities during peak mosquito hours"]',
  'Seek immediate medical attention if you experience: persistent vomiting, severe abdominal pain, rapid breathing, bleeding gums or nose, blood in vomit or stool, extreme fatigue, or restlessness. These could indicate severe dengue which is a medical emergency.',
  '["dengue", "dengue fever", "mosquito", "aedes", "viral fever", "breakbone fever"]'
),
(
  'Malaria',
  'Malaria is a life-threatening disease caused by Plasmodium parasites transmitted through the bites of infected female Anopheles mosquitoes. It is preventable and curable when diagnosed and treated promptly.',
  '["High fever with chills", "Profuse sweating", "Headache", "Nausea and vomiting", "Body aches and fatigue", "Diarrhea", "Anemia", "Jaundice", "Cyclical symptoms recurring every 48-72 hours"]',
  '["Bite from infected female Anopheles mosquito", "Plasmodium falciparum (most deadly)", "Plasmodium vivax", "Plasmodium malariae", "Plasmodium ovale", "Blood transfusion or needle sharing (rare)"]',
  '["Sleep under insecticide-treated mosquito nets", "Use indoor residual spraying", "Take antimalarial medications when traveling to endemic areas", "Use mosquito repellents", "Wear protective clothing", "Install window and door screens", "Eliminate standing water around homes", "Seek early diagnosis and treatment"]',
  'Consult a doctor immediately if you develop fever within 3 months of visiting a malaria-endemic area. Severe symptoms requiring emergency care include: confusion, seizures, difficulty breathing, severe anemia, or organ failure signs.',
  '["malaria", "plasmodium", "anopheles", "mosquito", "fever", "chills", "tropical disease"]'
),
(
  'Diabetes',
  'Diabetes is a chronic metabolic disorder characterized by elevated blood sugar levels. Type 1 diabetes is an autoimmune condition, while Type 2 diabetes is often linked to lifestyle factors and is more common.',
  '["Increased thirst and frequent urination", "Unexplained weight loss", "Extreme fatigue", "Blurred vision", "Slow-healing wounds", "Frequent infections", "Tingling or numbness in hands and feet", "Darkened skin patches (acanthosis nigricans)"]',
  '["Type 1: Autoimmune destruction of insulin-producing cells", "Type 2: Insulin resistance and lifestyle factors", "Genetic predisposition", "Obesity and sedentary lifestyle", "Poor diet high in processed foods and sugars", "Age (risk increases after 45)", "Gestational diabetes during pregnancy"]',
  '["Maintain a healthy body weight", "Engage in regular physical activity (150 minutes/week)", "Eat a balanced diet rich in vegetables, whole grains, and lean proteins", "Limit sugar and processed foods", "Avoid tobacco use", "Limit alcohol consumption", "Get regular health screenings", "Manage stress levels", "Get adequate sleep (7-9 hours)"]',
  'Consult a doctor if you experience any diabetes symptoms, have a family history of diabetes, or are overweight. Seek emergency care for: blood sugar extremes, fruity breath odor, confusion, excessive thirst with vomiting, or loss of consciousness.',
  '["diabetes", "blood sugar", "glucose", "insulin", "type 1", "type 2", "diabetic", "hyperglycemia"]'
),
(
  'Hypertension',
  'Hypertension, or high blood pressure, is a condition where blood pressure remains consistently elevated (140/90 mmHg or higher). Often called the "silent killer," it usually has no symptoms but significantly increases risk of heart disease and stroke.',
  '["Often no symptoms (silent condition)", "Severe headaches (in crisis)", "Shortness of breath", "Nosebleeds", "Dizziness", "Chest pain", "Vision problems", "Blood in urine", "Irregular heartbeat"]',
  '["Genetic factors and family history", "Excessive salt intake", "Obesity and overweight", "Physical inactivity", "Excessive alcohol consumption", "Chronic stress", "Smoking and tobacco use", "Age (risk increases with age)", "Chronic kidney disease", "Sleep apnea"]',
  '["Reduce sodium intake (less than 2,300mg daily)", "Maintain healthy weight", "Exercise regularly (30 minutes most days)", "Eat the DASH diet (rich in fruits, vegetables, whole grains)", "Limit alcohol consumption", "Quit smoking", "Manage stress through relaxation techniques", "Monitor blood pressure regularly", "Take prescribed medications consistently"]',
  'Get regular blood pressure checks, especially if over 40 or with risk factors. Seek emergency care for: severe headache with confusion, chest pain, difficulty breathing, severe anxiety, vision changes, or blood pressure above 180/120 mmHg.',
  '["hypertension", "high blood pressure", "blood pressure", "bp", "heart disease", "cardiovascular", "stroke risk"]'
),
(
  'COVID-19',
  'COVID-19 is a respiratory illness caused by the SARS-CoV-2 coronavirus. It spreads primarily through respiratory droplets and can range from mild symptoms to severe illness, particularly in high-risk groups.',
  '["Fever or chills", "Cough (usually dry)", "Shortness of breath or difficulty breathing", "Fatigue and body aches", "Headache", "New loss of taste or smell", "Sore throat", "Congestion or runny nose", "Nausea, vomiting, or diarrhea", "Long COVID symptoms may persist for weeks or months"]',
  '["SARS-CoV-2 coronavirus infection", "Respiratory droplets from infected person", "Close contact with infected individuals", "Touching contaminated surfaces then face", "Airborne transmission in poorly ventilated spaces", "Higher risk with new variants"]',
  '["Get vaccinated and boosted as recommended", "Wear masks in crowded indoor spaces", "Practice good hand hygiene", "Maintain physical distancing when possible", "Ensure good ventilation indoors", "Stay home when feeling unwell", "Get tested if experiencing symptoms", "Follow local health guidelines"]',
  'Seek medical care if you experience: difficulty breathing, persistent chest pain or pressure, confusion, inability to stay awake, pale or blue-colored skin, lips, or nail beds. High-risk individuals should consult early for antiviral treatment options.',
  '["covid", "covid-19", "coronavirus", "sars-cov-2", "pandemic", "respiratory", "vaccination"]'
),
(
  'Tuberculosis',
  'Tuberculosis (TB) is a bacterial infection caused by Mycobacterium tuberculosis that primarily affects the lungs but can spread to other organs. It spreads through airborne droplets when infected individuals cough or sneeze.',
  '["Persistent cough lasting more than 3 weeks", "Coughing up blood or bloody sputum", "Chest pain during breathing or coughing", "Unexplained weight loss", "Fatigue and weakness", "Fever and night sweats", "Chills", "Loss of appetite", "Swollen lymph nodes"]',
  '["Mycobacterium tuberculosis bacteria", "Airborne transmission from infected persons", "Close contact with TB patients", "Weakened immune system (HIV, malnutrition)", "Poor ventilation and crowded living conditions", "Healthcare workers at higher risk", "Drug-resistant strains emerging"]',
  '["Ensure good ventilation in living and working spaces", "Cover mouth when coughing or sneezing", "BCG vaccination for children in endemic areas", "Early detection and complete treatment of cases", "Contact tracing for exposed individuals", "Use respiratory protection in high-risk settings", "Maintain good nutrition and immune health", "Avoid close contact with known TB patients"]',
  'Consult a doctor if you have a persistent cough for more than 3 weeks, especially with blood, unexplained weight loss, night sweats, or fever. If you have been in close contact with someone diagnosed with TB, get tested immediately.',
  '["tb", "tuberculosis", "mycobacterium", "lung infection", "cough", "bcg", "pulmonary"]'
);