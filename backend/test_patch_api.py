import httpx
from app.core.config import settings

def main():
    # Login to get access token using form-data format
    login_url = "http://localhost:8000/api/users/login"
    login_data = {
        "username": "superuser@nestedhub.com",
        "password": "superuser_nestedhub123"
    }
    response = httpx.post(login_url, data=login_data)
    if response.status_code != 200:
        print(f"Login failed: {response.status_code} {response.text}")
        return
    
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 1. Fetch property details first
    property_id = 3
    get_url = f"http://localhost:8000/api/properties/{property_id}"
    res = httpx.get(get_url)
    if res.status_code != 200:
        print(f"Fetch failed: {res.status_code} {res.text}")
        return
    
    prop_data = res.json()
    print("Original Property Title:", prop_data["title"])
    print("Original Property Status:", prop_data["status"])
    print("Original Pricing:", prop_data["pricing"])
    
    # 2. Try PATCH request simulating the exact frontend payload from rents/[id]/edit/page.tsx
    payload = {
        "title": prop_data["title"],
        "description": prop_data["description"],
        "bedrooms": prop_data["bedrooms"],
        "bathrooms": prop_data["bathrooms"],
        "floor_area": float(prop_data["floor_area"]),
        "status": "available",
        "pricing": {
            "rent_price": 950.00
        }
    }
    
    patch_url = f"http://localhost:8000/api/properties/{property_id}"
    print(f"Sending PATCH request to {patch_url} with payload:", payload)
    patch_res = httpx.patch(patch_url, json=payload, headers=headers)
    print("PATCH response status:", patch_res.status_code)
    print("PATCH response body:", patch_res.text)
    
    # 3. Fetch again to verify if changes were saved
    res_after = httpx.get(get_url)
    prop_data_after = res_after.json()
    print("After PATCH Status:", prop_data_after["status"])
    print("After PATCH Pricing:", prop_data_after["pricing"])

if __name__ == "__main__":
    main()
