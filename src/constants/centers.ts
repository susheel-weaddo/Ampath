import { ImageSourcePropType } from 'react-native';

export type CenterCity = {
  id: string;
  state: string;
  city: string;
  image: ImageSourcePropType;
};

export type CenterLocation = {
  id: string;
  state: string;
  city: string;
  contactName: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  image: ImageSourcePropType;
};

const cityImageMap = {
  Tirupati: require('../assets/figma/Tirupati.png'),
  Guntur: require('../assets/figma/Guntur.png'),
  Anantapur: require('../assets/figma/Anantapur.png'),
  Visakhapatnam: require('../assets/figma/Visakhapatnam.png'),
  Chittoor: require('../assets/figma/Chittoor.png'),
  Kakinada: require('../assets/figma/Kakinada.png'),
  Kurnool: require('../assets/figma/Kurnool.png'),
  Rajahmundry: require('../assets/figma/Rajahmundry.png'),
  Kadapa: require('../assets/figma/Kadapa.png'),
  Gurugram: require('../assets/figma/Gurugram.png'),
  Vijayawada: require('../assets/figma/Vijayawada.png'),
  Amaravati: require('../assets/figma/Amaravati.png'),
  Bapatla: require('../assets/figma/Bapatla.png'),
  Guwahati: require('../assets/figma/Guwahati.png'),
  Indore: require('../assets/figma/Indore.png'),
  Hyderabad: require('../assets/figma/Hyderabad.png'),
  Jalandhar: require('../assets/figma/Jalandhar.png'),
} as const;

export const CENTER_CITIES: CenterCity[] = [
  { id: 'tirupati', state: 'Andhra Pradesh', city: 'Tirupati', image: cityImageMap.Tirupati },
  { id: 'guntur', state: 'Andhra Pradesh', city: 'Guntur', image: cityImageMap.Guntur },
  { id: 'anantapur', state: 'Andhra Pradesh', city: 'Anantapur', image: cityImageMap.Anantapur },
  { id: 'visakhapatnam', state: 'Andhra Pradesh', city: 'Visakhapatnam', image: cityImageMap.Visakhapatnam },
  { id: 'chittoor', state: 'Andhra Pradesh', city: 'Chittoor', image: cityImageMap.Chittoor },
  { id: 'kakinada', state: 'Andhra Pradesh', city: 'Kakinada', image: cityImageMap.Kakinada },
  { id: 'kurnool', state: 'Andhra Pradesh', city: 'Kurnool', image: cityImageMap.Kurnool },
  { id: 'rajahmundry', state: 'Andhra Pradesh', city: 'Rajahmundry', image: cityImageMap.Rajahmundry },
  { id: 'kadapa', state: 'Andhra Pradesh', city: 'Kadapa', image: cityImageMap.Kadapa },
  { id: 'vijayawada', state: 'Andhra Pradesh', city: 'Vijayawada', image: cityImageMap.Vijayawada },
  { id: 'amaravati', state: 'Andhra Pradesh', city: 'Amaravati', image: cityImageMap.Amaravati },
  { id: 'bapatla', state: 'Andhra Pradesh', city: 'Bapatla', image: cityImageMap.Bapatla },
  { id: 'gurugram', state: 'Haryana', city: 'Gurugram', image: cityImageMap.Gurugram },
  { id: 'guwahati', state: 'Assam', city: 'Guwahati', image: cityImageMap.Guwahati },
  { id: 'indore', state: 'Madhya Pradesh', city: 'Indore', image: cityImageMap.Indore },
  { id: 'hyderabad', state: 'Telangana', city: 'Hyderabad', image: cityImageMap.Hyderabad },
  { id: 'jalandhar', state: 'Punjab', city: 'Jalandhar', image: cityImageMap.Jalandhar },
];

const createCenter = (
  id: string,
  state: string,
  city: string,
  contactName: string,
  rating: number,
  reviewCount: number,
  distanceKm: number,
  addressLine1: string,
  addressLine2: string,
  phone: string,
): CenterLocation => {
  const cityImage = CENTER_CITIES.find((item) => item.city === city)?.image ?? cityImageMap.Hyderabad;

  return {
    id,
    state,
    city,
    contactName,
    rating,
    reviewCount,
    distanceKm,
    addressLine1,
    addressLine2,
    phone,
    image: cityImage,
  };
};

export const CENTER_LOCATIONS: CenterLocation[] = [
  createCenter('tirupati-1', 'Andhra Pradesh', 'Tirupati', 'Dr Meera Reddy', 4.8, 248, 2.1, 'Door No 19-8-112, Air Bypass Road', 'Near Leela Mahal Circle, Tirupati', '+918885500101'),
  createCenter('tirupati-2', 'Andhra Pradesh', 'Tirupati', 'Dr Kiran Kumar', 4.7, 184, 3.4, 'Plot 12, Renigunta Road', 'Opp. RTO Office, Tirupati', '+918885500102'),
  createCenter('guntur-1', 'Andhra Pradesh', 'Guntur', 'Dr Swathi Rao', 4.8, 231, 1.8, 'D No 6-14-45, Arundelpet', 'Beside KFC, Guntur', '+918885500103'),
  createCenter('guntur-2', 'Andhra Pradesh', 'Guntur', 'Dr Harish Babu', 4.6, 166, 4.2, '1st Lane, Brodipet', 'Near RTC Bus Stand, Guntur', '+918885500104'),
  createCenter('anantapur-1', 'Andhra Pradesh', 'Anantapur', 'Dr Vaishnavi', 4.7, 152, 2.7, '11-3-120, Ram Nagar', 'Clock Tower Circle, Anantapur', '+918885500105'),
  createCenter('anantapur-2', 'Andhra Pradesh', 'Anantapur', 'Dr Raghavendra', 4.5, 119, 5.1, 'Sri Sai Complex, Bellary Road', 'Near Sapthagiri Circle, Anantapur', '+918885500106'),
  createCenter('visakhapatnam-1', 'Andhra Pradesh', 'Visakhapatnam', 'Dr Priyanka Das', 4.9, 306, 1.2, 'VIP Road, Siripuram', 'Near RTC Complex, Visakhapatnam', '+918885500107'),
  createCenter('visakhapatnam-2', 'Andhra Pradesh', 'Visakhapatnam', 'Dr Naveen R', 4.8, 214, 3.6, 'Beach Road, Ram Nagar', 'Opp. AU Out Gate, Visakhapatnam', '+918885500108'),
  createCenter('chittoor-1', 'Andhra Pradesh', 'Chittoor', 'Dr Keerthana', 4.6, 132, 2.4, 'Prakasam High Road', 'Near Municipal Office, Chittoor', '+918885500109'),
  createCenter('chittoor-2', 'Andhra Pradesh', 'Chittoor', 'Dr Vikram Teja', 4.5, 97, 4.7, '22-419, Vellore Road', 'Near RTO Junction, Chittoor', '+918885500110'),
  createCenter('kakinada-1', 'Andhra Pradesh', 'Kakinada', 'Dr Usha Nair', 4.8, 211, 2.2, 'Cinema Road, Suryaraopeta', 'Near Bhanugudi Junction, Kakinada', '+918885500111'),
  createCenter('kakinada-2', 'Andhra Pradesh', 'Kakinada', 'Dr Sandeep K', 4.6, 144, 4.4, 'Main Road, Jagannaickpur', 'Near Port Signal, Kakinada', '+918885500112'),
  createCenter('kurnool-1', 'Andhra Pradesh', 'Kurnool', 'Dr Geetha Agrawal', 4.9, 264, 2.4, '43/19, N R Peta Main Road', 'Near Mourya Inn, Kurnool', '+918885500113'),
  createCenter('kurnool-2', 'Andhra Pradesh', 'Kurnool', 'Dr Sai Charan', 4.7, 189, 3.9, 'Municipal Office Road', 'Opp. Collectorate, Kurnool', '+918885500114'),
  createCenter('rajahmundry-1', 'Andhra Pradesh', 'Rajahmundry', 'Dr Roja Puri', 4.8, 241, 2.6, 'Danavaipeta Main Road', 'Near Kotipalli Bus Stand, Rajahmundry', '+918885500115'),
  createCenter('rajahmundry-2', 'Andhra Pradesh', 'Rajahmundry', 'Dr Keerthi Raj', 4.6, 173, 5.4, 'Tilak Road', 'Near Godavari Bund, Rajahmundry', '+918885500116'),
  createCenter('kadapa-1', 'Andhra Pradesh', 'Kadapa', 'Dr Anita Sharma', 4.7, 203, 2.1, '7/105, Nagarajupeta', 'Near APSRTC Depot, Kadapa', '+918885500117'),
  createCenter('kadapa-2', 'Andhra Pradesh', 'Kadapa', 'Dr Farooq Ali', 4.5, 118, 4.8, 'Railway Station Road', 'Near Seven Roads Circle, Kadapa', '+918885500118'),
  createCenter('gurugram-1', 'Haryana', 'Gurugram', 'Dr Vikram Singh', 4.8, 276, 2.4, 'Golf Course Road, Sector 53', 'Near One Horizon Center, Gurugram', '+918885500119'),
  createCenter('gurugram-2', 'Haryana', 'Gurugram', 'Dr Nidhi Batra', 4.7, 201, 3.3, 'Sector 44 Main Road', 'Opp. HUDA City Centre, Gurugram', '+918885500120'),
  createCenter('vijayawada-1', 'Andhra Pradesh', 'Vijayawada', 'Dr Tejaswini', 4.8, 258, 1.6, 'M G Road, Labbipet', 'Near Benz Circle, Vijayawada', '+918885500121'),
  createCenter('vijayawada-2', 'Andhra Pradesh', 'Vijayawada', 'Dr Madhav Krishna', 4.6, 161, 4.1, 'Eluru Road', 'Opp. Ramesh Hospital, Vijayawada', '+918885500122'),
  createCenter('amaravati-1', 'Andhra Pradesh', 'Amaravati', 'Dr Harini', 4.7, 123, 6.1, 'Mandadam Road', 'Near Secretariat Zone, Amaravati', '+918885500123'),
  createCenter('amaravati-2', 'Andhra Pradesh', 'Amaravati', 'Dr Rohit Varma', 4.5, 94, 7.2, 'Velagapudi Main Road', 'Near CRDA Office, Amaravati', '+918885500124'),
  createCenter('bapatla-1', 'Andhra Pradesh', 'Bapatla', 'Dr Bhavana', 4.6, 111, 2.8, 'Beach Road', 'Near RTC Complex, Bapatla', '+918885500125'),
  createCenter('bapatla-2', 'Andhra Pradesh', 'Bapatla', 'Dr Santhosh', 4.4, 82, 4.9, 'GBC Road', 'Near Bapatla Engineering College, Bapatla', '+918885500126'),
  createCenter('guwahati-1', 'Assam', 'Guwahati', 'Dr Pranjal Deka', 4.8, 223, 3.1, 'GS Road, Bhangagarh', 'Near Downtown Hospital, Guwahati', '+918885500127'),
  createCenter('guwahati-2', 'Assam', 'Guwahati', 'Dr Juri Kalita', 4.6, 149, 5.5, 'Zoo Road', 'Opp. State Zoo, Guwahati', '+918885500128'),
  createCenter('indore-1', 'Madhya Pradesh', 'Indore', 'Dr Rajesh Puri', 4.8, 244, 2.3, 'Vijay Nagar Square', 'Near C21 Mall, Indore', '+918885500129'),
  createCenter('indore-2', 'Madhya Pradesh', 'Indore', 'Dr Sonali Jain', 4.7, 186, 4.6, 'AB Road, Palasia', 'Near Geeta Bhawan, Indore', '+918885500130'),
  createCenter('hyderabad-1', 'Telangana', 'Hyderabad', 'Dr Samhita Rao', 4.9, 318, 1.4, 'Road No 36, Jubilee Hills', 'Near Peddamma Temple, Hyderabad', '+918885500131'),
  createCenter('hyderabad-2', 'Telangana', 'Hyderabad', 'Dr Aditya Menon', 4.8, 252, 3.7, 'Hitech City Main Road', 'Opp. Shilparamam, Hyderabad', '+918885500132'),
  createCenter('jalandhar-1', 'Punjab', 'Jalandhar', 'Dr Gurleen Kaur', 4.7, 173, 2.6, 'Model Town Road', 'Near Nikku Park, Jalandhar', '+918885500133'),
  createCenter('jalandhar-2', 'Punjab', 'Jalandhar', 'Dr Hardeep Singh', 4.5, 121, 4.3, 'Ladowali Road', 'Near Railway Station, Jalandhar', '+918885500134'),
];

export const CENTER_STATES = ['All States', ...new Set(CENTER_CITIES.map((item) => item.state))];

export const getCitiesForState = (state: string) => {
  const cities = CENTER_CITIES.filter((item) => state === 'All States' || item.state === state).map((item) => item.city);
  return ['All Cities', ...cities];
};
