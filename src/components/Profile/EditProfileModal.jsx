import { useState } from "react";
import { useProfile } from "./ProfileContext";


export default function EditProfileModal({ profile, onClose }) {
  const { updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ ...profile, name, phone });
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Edit Profile
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          value={profile.email}
          disabled
          className="w-full border p-2 rounded mb-3 bg-gray-100"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
