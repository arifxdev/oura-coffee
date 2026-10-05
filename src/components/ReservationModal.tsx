import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, MapPin } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2');
  const [time, setTime] = useState('19:00');
  const [date, setDate] = useState('2026-10-06');
  const [area, setArea] = useState('Skylight Dining Hall');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#D5CABB] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B635A] hover:bg-[#EDE5DA] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-[#2E5444] mx-auto animate-in zoom-in duration-300" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2E5444] block">
              Reservation Confirmed
            </span>
            <h3 className="font-display text-3xl text-[#1B1917]">
              Table Reserved for {name}
            </h3>
            <p className="text-xs text-[#6B635A] leading-relaxed max-w-sm mx-auto">
              We have reserved your table in the <strong>{area}</strong> for{' '}
              <strong>{guests} guests</strong> on <strong>{date}</strong> at{' '}
              <strong>{time}</strong>. An SMS confirmation will be sent shortly.
            </p>

            <div className="p-4 bg-[#EFE9DF] rounded-2xl text-left text-xs space-y-2 mt-4">
              <div className="flex items-center gap-2 text-[#574F46]">
                <MapPin className="w-4 h-4 text-[#234133]" />
                <span>Jl. Pahlawan Trip No. A11, Oro-oro Dowo, Malang</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full py-3.5 rounded-full bg-[#181614] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#234133] transition-colors mt-4"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#2E5444] mb-1 block">
                Table Booking
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#1B1917] uppercase">
                Reserve A Table
              </h3>
              <p className="text-xs text-[#7A7167]">
                Experience Oura's specialty coffee, casual fine dining, and warm ambiance.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#696157] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5CABB] bg-white text-sm text-[#1B1917] focus:outline-none focus:border-[#234133]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#696157] mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D5CABB] bg-white text-sm text-[#1B1917] focus:outline-none focus:border-[#234133]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#696157] mb-1">
                    Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D5CABB] bg-white text-sm text-[#1B1917] focus:outline-none focus:border-[#234133]"
                  >
                    {['09:00', '11:30', '13:00', '15:30', '18:00', '19:30', '21:00'].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#696157] mb-1">
                  Seating Area
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Skylight Hall', 'Espresso Bar', 'Garden Lawn'].map((zone) => (
                    <button
                      type="button"
                      key={zone}
                      onClick={() => setArea(zone)}
                      className={`py-2 px-2 rounded-xl border text-center font-medium transition-all ${
                        area === zone
                          ? 'bg-[#234133] text-white border-[#234133]'
                          : 'bg-white text-[#5D554D] border-[#D5CABB] hover:bg-[#EFE9DF]'
                      }`}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#181614] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#234133] transition-all duration-200 smooth-press shadow-md mt-4"
              >
                Confirm Table Reservation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
