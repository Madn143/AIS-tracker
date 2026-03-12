import kagglehub
import pandas as pd
import os
from sklearn.ensemble import IsolationForest

# 1. Download the dataset using your KaggleHub snippet
print("Downloading dataset via KaggleHub...")
path = kagglehub.dataset_download("satyamrajput7913/ais-ship-tracking-vessel-dynamics-and-eta-data")
print(f"Dataset downloaded to: {path}")

# 2. Locate the CSV file in the downloaded directory
csv_files = [f for f in os.listdir(path) if f.endswith('.csv')]
if not csv_files:
    raise FileNotFoundError("No CSV file found in the downloaded folder!")

csv_file_path = os.path.join(path, csv_files[0])

# 3. Load the Data safely
# We use nrows=100000 to keep the script running in seconds. 
# You can remove nrows=100000 for the final presentation.
print(f"Loading data from {csv_files[0]}...")
df = pd.read_csv(csv_file_path, nrows=100000)

# Print columns just to verify exact names (Standard AIS usually has these)
print(f"Available columns: {list(df.columns)}")

# 4. Clean and Prep the Features
# Adjust these strings if the Kaggle dataset uses lowercase (e.g., 'lat', 'lon')
features = ['LAT', 'LON', 'SOG', 'COG']

# Extract features and drop missing data to prevent math errors
print("Cleaning data...")
X = df[features].dropna()

# 5. Train the AI Model
# contamination=0.01 means we assume the top 1% weirdest behaviors are anomalies
print("Training the Isolation Forest AI...")
model = IsolationForest(n_estimators=100, contamination=0.01, random_state=42)

# 6. Predict Anomalies (-1 = Suspicious, 1 = Normal)
print("Scanning for dark vessels...")
X['anomaly_status'] = model.fit_predict(X[features])

# 7. Separate the targets
normal_vessels = X[X['anomaly_status'] == 1]
dark_vessels = X[X['anomaly_status'] == -1]

# 8. Sample the normal data to prevent browser crashes
# We randomly select 3,000 normal ships to map the safe shipping lanes
print("Optimizing data for web rendering...")
sampled_normal = normal_vessels.sample(n=3000, random_state=42)

# 9. Combine and Export
final_export = pd.concat([sampled_normal, dark_vessels])
output_file = 'all_vessels.json'
final_export.to_json(output_file, orient='records')

print("\n--- SCAN COMPLETE ---")
print(f"✅ Exported {len(sampled_normal)} normal vessels (Green).")
print(f"🚨 Exported {len(dark_vessels)} suspicious targets (Red).")
print(f"💾 Saved combined data to {output_file}.")