
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
        {
            role:'user',
            parts:[
                {text:"Generate A Course Tutorial on Following Detail With field Course Name,Description,Along with chapter Name, about , Duration Category:Programming,Topic:Python,Level:Basic,Duration:1 hours,No Of Chapters: 5, in JSON format"}
            ]
        },
        {
            role:"model",
            parts:[
                {text:"```json\n{}```"}
            ],
        },
    ],
});


export const GenerateChapterContent_AI = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Explain the concept in Detail on Topic: Python,Chapter:Building Machine Learning Models, in JSON Format with list of array with fields as title, explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"title\": \"Introduction to Machine Learning with Python\",\n    \"explanation\": \"This chapter delves into the fundamentals of machine learning (ML) within the context of Python. We'll explore the core concepts of ML, the different types of algorithms, and the common tasks they address. The chapter also introduces essential Python libraries like Scikit-learn, NumPy, and Pandas, which are instrumental in building and deploying ML models.\",\n    \"code_example\": \"\"\n  },\n  {\n    \"title\": \"Data Preparation and Feature Engineering\",\n    \"explanation\": \"Machine learning models thrive on high-quality data. This chapter covers the crucial steps of data preparation, including data cleaning, transformation, and feature engineering. We'll learn how to handle missing values, encode categorical variables, and create new features that enhance model performance.\",\n    \"code_example\": \"<precode>\\nimport pandas as pd\\nfrom sklearn.impute import SimpleImputer\\nfrom sklearn.preprocessing import OneHotEncoder\\n\\ndata = pd.read_csv('data.csv')\\n\\n# Handle missing values\\nimp = SimpleImputer(strategy='mean')\\ndata[['age', 'income']] = imp.fit_transform(data[['age', 'income']])\\n\\n# Encode categorical features\\nencoder = OneHotEncoder(handle_unknown='ignore')\\nfeatures = encoder.fit_transform(data[['gender']]).toarray()\\n\\n# Create new features\\ndata['age_squared'] = data['age'] * data['age']\\n</precode>\"\n  },\n  {\n    \"title\": \"Supervised Learning: Regression\",\n    \"explanation\": \"This section focuses on supervised learning, specifically regression models. Regression tasks aim to predict continuous values. We'll examine popular algorithms like Linear Regression, Polynomial Regression, and Decision Tree Regression, and learn how to train, evaluate, and interpret these models.\",\n    \"code_example\": \"<precode>\\nfrom sklearn.linear_model import LinearRegression\\nfrom sklearn.model_selection import train_test_split\\nfrom sklearn.metrics import mean_squared_error\\n\\n# Split data into training and testing sets\\nX_train, X_test, y_train, y_test = train_test_split(data.drop('price', axis=1), data['price'], test_size=0.2)\\n\\n# Create and train a Linear Regression model\\nmodel = LinearRegression()\\nmodel.fit(X_train, y_train)\\n\\n# Make predictions on the test set\\npredictions = model.predict(X_test)\\n\\n# Evaluate the model\\nrmse = mean_squared_error(y_test, predictions, squared=False)\\nprint(f'Root Mean Squared Error: {rmse}')\\n</precode>\"\n  },\n  {\n    \"title\": \"Supervised Learning: Classification\",\n    \"explanation\": \"Classification tasks in supervised learning involve predicting discrete categories. This chapter explores popular algorithms like Logistic Regression, Support Vector Machines (SVMs), Decision Trees, and Random Forests. We'll learn how to train, evaluate, and choose the best model for different classification problems.\",\n    \"code_example\": \"<precode>\\nfrom sklearn.linear_model import LogisticRegression\\nfrom sklearn.model_selection import train_test_split\\nfrom sklearn.metrics import accuracy_score\\n\\n# Split data into training and testing sets\\nX_train, X_test, y_train, y_test = train_test_split(data.drop('target', axis=1), data['target'], test_size=0.2)\\n\\n# Create and train a Logistic Regression model\\nmodel = LogisticRegression()\\nmodel.fit(X_train, y_train)\\n\\n# Make predictions on the test set\\npredictions = model.predict(X_test)\\n\\n# Evaluate the model\\naccuracy = accuracy_score(y_test, predictions)\\nprint(f'Accuracy: {accuracy}')\\n</precode>\"\n  },\n  {\n    \"title\": \"Unsupervised Learning\",\n    \"explanation\": \"Unsupervised learning focuses on extracting patterns and insights from unlabeled data. This chapter covers techniques like clustering, dimensionality reduction, and association rule mining. We'll use algorithms like K-Means Clustering, Principal Component Analysis (PCA), and Apriori to uncover hidden structures and relationships in data.\",\n    \"code_example\": \"<precode>\\nfrom sklearn.cluster import KMeans\\nfrom sklearn.preprocessing import StandardScaler\\n\\n# Standardize the data\\nscaler = StandardScaler()\\ndata_scaled = scaler.fit_transform(data)\\n\\n# Apply K-Means clustering\\nkmeans = KMeans(n_clusters=3)\\nkmeans.fit(data_scaled)\\n\\n# Get cluster assignments\\nclusters = kmeans.labels_\\nprint(clusters)\\n</precode>\"\n  },\n  {\n    \"title\": \"Model Evaluation and Selection\",\n    \"explanation\": \"Evaluating and selecting the best model is crucial for machine learning success. This chapter covers various metrics for evaluating model performance, including accuracy, precision, recall, F1-score, and AUC-ROC. We'll also discuss techniques for cross-validation, which helps to ensure model robustness and generalize well to unseen data.\",\n    \"code_example\": \"<precode>\\nfrom sklearn.model_selection import cross_val_score\\nfrom sklearn.metrics import classification_report\\n\\n# Perform cross-validation\\nscores = cross_val_score(model, X, y, cv=5)\\nprint(f'Cross-validation scores: {scores}')\\n\\n# Calculate performance metrics\\nreport = classification_report(y_test, predictions)\\nprint(report)\\n</precode>\"\n  },\n  {\n    \"title\": \"Hyperparameter Tuning and Optimization\",\n    \"explanation\": \"Hyperparameters are settings that control the learning process of a model. This chapter focuses on techniques for tuning and optimizing hyperparameters to maximize model performance. We'll explore methods like grid search, random search, and Bayesian optimization, which help to find the optimal combination of hyperparameters.\",\n    \"code_example\": \"<precode>\\nfrom sklearn.model_selection import GridSearchCV\\n\\n# Define the parameter grid\\nparam_grid = {'C': [0.1, 1, 10], 'penalty': ['l1', 'l2']}\\n\\n# Create a GridSearchCV object\\ngrid_search = GridSearchCV(model, param_grid, cv=5)\\n\\n# Fit the GridSearchCV object\\ngrid_search.fit(X, y)\\n\\n# Print the best parameters and score\\nprint(f'Best parameters: {grid_search.best_params_}')\\nprint(f'Best score: {grid_search.best_score_}')\\n</precode>\"\n  },\n  {\n    \"title\": \"Deployment and Integration\",\n    \"explanation\": \"The final step is to deploy and integrate your trained ML models into real-world applications. This chapter discusses different deployment options, such as using APIs, web services, or cloud platforms. We'll also cover the importance of monitoring model performance over time and re-training models as needed.\",\n    \"code_example\": \"\"\n  }\n]\n```"},
        ],
      },
    ],
  });
