import { CareerNode } from './types';

export const dataAndAIData: CareerNode = {
  id: 'data-and-ai',
  title: 'Data & AI',
  category: 'data-and-ai',
  type: 'category',
  icon: 'Brain',
  description: 'Data engineering, analytics, machine learning, artificial intelligence, LLMs, and big data infrastructure.',
  overview: 'Data & AI empowers organizations to process massive datasets, discover predictive insights, and build intelligent autonomous AI systems.',
  skillsRequired: ['Python', 'SQL', 'Statistics & Probability', 'Machine Learning Algorithms', 'Data Modeling', 'Deep Learning Frameworks'],
  children: [
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      type: 'role',
      icon: 'BarChart2',
      description: 'Transform raw data into meaningful business insights through visualization, statistical queries, and dashboards.',
      overview: 'Data Analysts use SQL, Excel, and BI tools to summarize metrics, uncover operational trends, and aid executive decision-making.',
      skillsRequired: ['SQL Queries', 'Data Cleaning', 'Data Visualization', 'Exploratory Data Analysis'],
      tools: ['Excel', 'SQL Server / PostgreSQL', 'Power BI', 'Tableau'],
      projects: ['Customer Churn Dashboard', 'Sales Pipeline Analysis', 'Financial Performance Report'],
      children: [
        { id: 'excel', title: 'Excel', type: 'stack', description: 'Advanced formulas, pivot tables, VLOOKUP/XLOOKUP, and VBA automation.' },
        { id: 'sql-analytics', title: 'SQL', type: 'stack', description: 'Relational data queries, JOINs, window functions, and aggregation.' },
        { id: 'power-bi', title: 'Power BI', type: 'stack', description: 'Microsoft business analytics platform for interactive reports and DAX formulas.' },
        { id: 'tableau', title: 'Tableau', type: 'stack', description: 'Interactive visual data visualization desktop and server software.' },
        { id: 'business-intelligence', title: 'Business Intelligence', type: 'specialization', description: 'Designing data marts, KPI dashboards, and enterprise reporting pipelines.' }
      ]
    },
    {
      id: 'data-engineer',
      title: 'Data Engineer',
      type: 'role',
      icon: 'Database',
      description: 'Build and maintain scalable data pipelines, data warehouses, streaming systems, and ETL flows.',
      overview: 'Data Engineers build the foundational plumbing that ingests, cleans, structures, and delivers reliable data for analysis and ML models.',
      skillsRequired: ['Python / Scala', 'Advanced SQL', 'ETL Pipeline Design', 'Distributed Systems', 'Data Warehousing'],
      tools: ['Apache Spark', 'Apache Kafka', 'Airflow', 'Snowflake', 'BigQuery', 'dbt'],
      projects: ['Real-time Log Streaming Pipeline', 'Data Warehouse Migration to Snowflake', 'Automated ETL Batch Orchestration'],
      linkedCourseId: 'python',
      children: [
        { id: 'sql-de', title: 'SQL', type: 'stack', description: 'Database schema modeling, indexing, and high-performance querying.' },
        { id: 'python-de', title: 'Python', type: 'stack', description: 'Python data scripting with pandas, PySpark, and SQLAlchemy.', linkedCourseId: 'python' },
        { id: 'etl-elt', title: 'ETL / ELT', type: 'specialization', description: 'Extract, Transform, Load / Extract, Load, Transform pipeline design.' },
        { id: 'data-warehousing', title: 'Data Warehousing', type: 'specialization', description: 'Columnar storage, star schemas, dimensional modeling with Snowflake / Redshift.' },
        { id: 'apache-spark', title: 'Apache Spark', type: 'stack', description: 'Distributed large-scale data processing engine for batch and streaming data.' },
        { id: 'kafka', title: 'Kafka', type: 'stack', description: 'Distributed event streaming platform for real-time data pipelines.' },
        { id: 'cloud-data-engineering', title: 'Cloud Data Engineering', type: 'specialization', description: 'AWS EMR, Databricks, GCP Dataflow, and cloud data architecture.' }
      ]
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      type: 'role',
      icon: 'TrendingUp',
      description: 'Combine statistics, programming, and machine learning to build predictive models and derive scientific data insights.',
      overview: 'Data Scientists formulate hypothesis tests, clean unstructured datasets, train predictive models, and deploy quantitative solutions.',
      skillsRequired: ['Python / R', 'Linear Algebra & Calculus', 'Probability & Statistics', 'Scikit-learn', 'Feature Engineering'],
      tools: ['Jupyter Notebooks', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib / Seaborn'],
      projects: ['Housing Price Prediction Model', 'Customer Segmentation Clustering', 'Sentiment Classifier'],
      linkedCourseId: 'python',
      children: [
        { id: 'python-ds', title: 'Python', type: 'stack', description: 'The de facto language for statistical data science.', linkedCourseId: 'python' },
        { id: 'statistics', title: 'Statistics', type: 'subject', description: 'Hypothesis testing, regression analysis, Bayesian inference, and distributions.' },
        { id: 'data-analysis', title: 'Data Analysis', type: 'subject', description: 'Exploratory analysis, feature extraction, and handling missing data.' },
        { id: 'machine-learning-ds', title: 'Machine Learning', type: 'subject', description: 'Supervised and unsupervised algorithms (Random Forests, XGBoost, K-Means).' },
        { id: 'deep-learning-ds', title: 'Deep Learning', type: 'subject', description: 'Neural networks, PyTorch, TensorFlow, and gradient descent.' }
      ]
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      type: 'role',
      icon: 'Cpu',
      description: 'Designing, training, optimizing, and deploying mathematical algorithms that learn from data.',
      overview: 'Machine Learning Engineers build automated systems that generalize patterns from empirical datasets to make autonomous predictions.',
      linkedCourseId: 'python',
      children: [
        { id: 'ml-engineer', title: 'ML Engineer', type: 'specialization', description: 'Engineers who deploy machine learning models into reliable production software.' },
        { id: 'classical-ml', title: 'Classical Machine Learning', type: 'specialization', description: 'Linear regression, decision trees, SVMs, clustering, and ensemble methods.' },
        { id: 'deep-learning', title: 'Deep Learning', type: 'specialization', description: 'Multi-layer neural networks, CNNs, RNNs, Transformers, PyTorch, and TensorFlow.' },
        { id: 'reinforcement-learning', title: 'Reinforcement Learning', type: 'specialization', description: 'Reward-based policy learning, Q-learning, PPO, and agent optimization.' },
        { id: 'mlops', title: 'MLOps', type: 'specialization', description: 'CI/CD for ML models, model monitoring, MLflow, DVC, and automated retraining.' },
        { id: 'model-deployment', title: 'Model Deployment', type: 'specialization', description: 'ONNX runtime, TensorRT, FastAPI model serving, and low-latency inference.' }
      ]
    },
    {
      id: 'artificial-intelligence',
      title: 'Artificial Intelligence',
      type: 'role',
      icon: 'Sparkles',
      description: 'Creating intelligent software systems capable of perception, reasoning, planning, and autonomous problem solving.',
      linkedCourseId: 'python',
      children: [
        { id: 'ai-engineer', title: 'AI Engineer', type: 'specialization', description: 'Integrates foundation models, APIs, and AI cognitive pipelines into software products.' },
        { id: 'gen-ai-engineer', title: 'Generative AI Engineer', type: 'specialization', description: 'Builds systems powered by modern Large Language Models and diffusion models.' },
        { id: 'ai-app-developer', title: 'AI Application Developer', type: 'specialization', description: 'Focuses on user-facing applications with embedded AI capabilities.' },
        { id: 'ai-research-engineer', title: 'AI Research Engineer', type: 'specialization', description: 'Bridge between academic AI research and scaleable production implementations.' },
        { id: 'ai-solutions-engineer', title: 'AI Solutions Engineer', type: 'specialization', description: 'Designs custom AI integration architectures for enterprise clients.' }
      ]
    },
    {
      id: 'nlp',
      title: 'NLP (Natural Language Processing)',
      type: 'role',
      icon: 'MessageSquare',
      description: 'Processing, understanding, classifying, and generating human language text and speech.',
      children: [
        { id: 'nlp-engineer', title: 'NLP Engineer', type: 'specialization', description: 'Specialist in tokenization, text embeddings, sentiment, and translation.' },
        { id: 'text-classification', title: 'Text Classification', type: 'topic', description: 'Categorizing text documents into pre-defined thematic topics or sentiment classes.' },
        { id: 'transformers', title: 'Transformers', type: 'stack', description: 'Self-attention architecture underlying BERT, GPT, and modern NLP.' },
        { id: 'llms-nlp', title: 'LLMs', type: 'stack', description: 'Large Language Models fine-tuned for specialized domain tasks.' },
        { id: 'conversational-ai', title: 'Conversational AI', type: 'specialization', description: 'Building dialogue systems, chatbots, and voice assistants.' }
      ]
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision',
      type: 'role',
      icon: 'Eye',
      description: 'Enabling software to analyze, understand, and interpret digital visual inputs (images and video).',
      children: [
        { id: 'image-processing', title: 'Image Processing', type: 'topic', description: 'Filtering, edge detection, color spaces, and OpenCV routines.' },
        { id: 'object-detection', title: 'Object Detection', type: 'topic', description: 'Bounding box localization using YOLO, Faster R-CNN, and SSD models.' },
        { id: 'image-classification', title: 'Image Classification', type: 'topic', description: 'CNN architectures (ResNet, EfficientNet) classifying visual content.' },
        { id: 'ocr', title: 'OCR', type: 'topic', description: 'Optical Character Recognition extracting text from scanned visual media.' },
        { id: 'video-analytics', title: 'Video Analytics', type: 'specialization', description: 'Real-time multi-object tracking, pose estimation, and video stream processing.' }
      ]
    },
    {
      id: 'generative-ai',
      title: 'Generative AI',
      type: 'role',
      icon: 'Zap',
      description: 'Next-generation AI producing synthetic text, code, images, audio, and multimodal content.',
      children: [
        { id: 'llm-engineering', title: 'LLM Engineering', type: 'specialization', description: 'Building applications powered by Gemini, GPT-4, Llama 3, and Claude.' },
        { id: 'prompt-engineering', title: 'Prompt Engineering', type: 'topic', description: 'Crafting effective system prompts, few-shot examples, and chain-of-thought instructions.' },
        { id: 'rag', title: 'RAG (Retrieval-Augmented Generation)', type: 'topic', description: 'Combining document retrieval with LLM generation for factual enterprise search.' },
        { id: 'vector-databases', title: 'Vector Databases', type: 'stack', description: 'Pinecone, Qdrant, ChromaDB, Weaviate for storing high-dimensional embeddings.' },
        { id: 'ai-agents', title: 'AI Agents', type: 'specialization', description: 'Autonomous agents with tool execution, memory, and multi-step planning (LangChain, AutoGen).' },
        { id: 'fine-tuning', title: 'Fine-Tuning', type: 'topic', description: 'LoRA, QLoRA, and SFT (Supervised Fine-Tuning) adapting models to specialized tasks.' },
        { id: 'multimodal-ai', title: 'Multimodal AI', type: 'specialization', description: 'Models processing vision, audio, text, and code seamlessly.' }
      ]
    },
    {
      id: 'big-data',
      title: 'Big Data',
      type: 'role',
      icon: 'HardDrive',
      description: 'Distributed computing infrastructure processing petabyte-scale datasets across compute clusters.',
      children: [
        { id: 'hadoop', title: 'Hadoop', type: 'stack', description: 'HDFS distributed file storage and MapReduce execution engine.' },
        { id: 'spark-bigdata', title: 'Spark', type: 'stack', description: 'In-memory distributed data processing framework.' },
        { id: 'kafka-bigdata', title: 'Kafka', type: 'stack', description: 'High-throughput event streaming broker.' },
        { id: 'data-lakes', title: 'Data Lakes', type: 'specialization', description: 'S3 / ADLS storage repositories storing raw structured and unstructured data.' },
        { id: 'data-platforms', title: 'Data Platforms', type: 'specialization', description: 'End-to-end data platform architecture supporting analytics and governance.' }
      ]
    }
  ]
};
