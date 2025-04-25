"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import L from "leaflet";

// Dynamically import react-leaflet components (disable SSR)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const position: [number, number] = [15.890503, 80.441683];

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41], // Default Leaflet marker size
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34], // Position of popup relative to marker
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});


export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      details: "saivardhanmanikala@gmail.com",
      description: "Send us an email anytime!",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      details: "+91 7780196021",
      description: "Mon-Fri from 9am to 5pm.",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "College",
      details: "Bapatla Engineering College",
      description: "Bapatla, India",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Contact <span className="text-primary">Us</span>
          </h1>

          <div className="max-w-5xl mx-auto">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {contactInfo.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="font-medium">{item.details}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form & Map Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Have questions about our Medical Insurance Cost Estimator? Want to provide feedback or report an
                  issue? Fill out the form and we'll get back to you as soon as possible.
                </p>
                <ContactForm />
              </div>

              {/* Map Section */}
              <div className="flex items-center justify-center">
                <div className="w-full h-[300px] md:w-[500px] md:h-[350px] rounded-lg overflow-hidden border shadow-lg">
                  <MapContainer center={position} zoom={15} className="w-full h-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position} icon={customIcon}>
                      <Popup>
                        <span>Bapatla Engineering College 📍</span>
                      </Popup>
                    </Marker>

                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
