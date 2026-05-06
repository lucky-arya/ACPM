import trafficPoliceImage from '../assets/MumbaiTrafficPolice/EC_Committee.webp';
import pressRelease1 from '../assets/Press_Releases/Press_1.webp';
import acpmPanvel01 from '../assets/Acpm Annual Conference 2026 Panvel/Event/IMG_4829.jpg';

export const events = [
  {
    id: 1,
    title: "Annual ACPM Conference 2026 Panvel",
    date: "2026-01-10",
    description: "Annual conference at Visava Resort, Panvel with 125+ perfusionists and healthcare professionals.",
    type: "Conference",
    registrationOpen: false,
    image: acpmPanvel01,
    location: "Visava Resort, Panvel",
    completed: true
  },
  {
    id: 2,
    title: "ACPM E.C Committee Meets Mumbai Traffic Police Commissioner",
    date: "2026-02-26",
    description: "ACPM E.C Committee thanked Mumbai Traffic Police Commissioner Mr. Anil Kumbhare for Green Corridor services.",
    type: "Community",
    registrationOpen: false,
    image: trafficPoliceImage,
    location: "Mumbai Traffic Police HQ",
    completed: true
  },
  {
    id: 3,
    title: "ACPM PRESS RELEASE",
    date: "N/A",
    description: "Official press releases and media coverage from the Association of Clinical Perfusionists Maharashtra.",
    type: "Announcement",
    registrationOpen: false,
    image: pressRelease1,
    location: "Maharashtra",
    completed: false
  }
];

export const objectives = [
  {
    title: "Excellence in Practice",
    description: "Creating excellence in perfusion to ensure safe, quality, and modern patient care."
  },
  {
    title: "Professional Advocacy",
    description: "Protecting and promoting the professional interests of Clinical Perfusionist."
  },
  {
    title: "Education & Training",
    description: "Promoting education, training, and continuous skill development."
  },
  {
    title: "Research & Innovation",
    description: "Encouraging research and innovation in perfusion science and technology."
  },
  {
    title: "International Standards",
    description: "Establishing professional standards at national and international levels."
  },
  {
    title: "Career Guidance",
    description: "Providing career guidance and mentorship for young Perfusionist."
  }
];
