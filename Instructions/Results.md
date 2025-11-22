# Results

## Project description
Purpose of this project is to define which resulst should be returned base on the user preference. It should be possible to define how mapy results should be returned (eg.: top 5, 10, 20, etc.). 

## Scoring
AI should score each result based on the user preference. AI should use the following scoring system:
- Price (1-10)
- Location (1-10)
- Type (1-10)
- Rating (1-10)
- Reviews (1-10)
- Amenities (1-10)
- Services (1-10)
- Safety (1-10)
- Cleanliness (1-10)
- Value for money (1-10)
- Reviews (if available, review some users feedback, understand if the user likes the place or not and assign score based on that).
And calculate overall score (1-10) based on the user preference. 

## Results ordering
Order will be based on the overall score. Only top N results will be returned, where N is defined by the user, ordered by the scode (total overall score).