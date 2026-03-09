"use client";

import Notifications from "@/components/notification-section/notifications";
import { Link } from "@/i18n/navigation";
import { Bell, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function ToggleNotification() {
  // Icons
  const icons = [
    { id: 1, href: "/wishlist", icon: <Heart size={24} /> },
    { id: 2, href: "/cart", icon: <ShoppingCart size={24} /> },
    { id: 3, href: "/", icon: <Bell size={24} /> },
  ];

  // State
  const [notificationClicked, setNotificationClicked] = useState(false);

  return (
    <>
      {icons.map((item) => (
        <li className="relative list-none" key={item.id}>
          <Link
            onClick={() =>
              item.id === 3
                ? setNotificationClicked((prev) => !prev)
                : setNotificationClicked((prev) => prev)
            }
            href={item.href}
          >
            {item.icon}
          </Link>
        </li>
      ))}

      {notificationClicked && <Notifications />}
    </>
  );
}
