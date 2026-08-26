import { useState } from 'react';
import { X, CreditCard, Calendar, Clock, Check } from 'lucide-react';
import type { Experience, TimeSlot } from '../../types';
import toast from 'react-hot-toast';

interface BookingModalProps {
  experience: Experience;
  isOpen: boolean;
  onClose: () => void;
  onBook: (date: string, timeSlotId: string) => Promise<void>;
}

export default function BookingModal({ experience, isOpen, onClose, onBook }: BookingModalProps) {
  const [step, setStep] = useState<'date' | 'time' | 'review' | 'payment' | 'confirmed'>('date');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const generateDates = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  const timeSlots: TimeSlot[] = [
    { id: '1', startTime: '09:00', endTime: '10:00', isAvailable: true },
    { id: '2', startTime: '10:00', endTime: '11:00', isAvailable: true },
    { id: '3', startTime: '11:00', endTime: '12:00', isAvailable: false },
    { id: '4', startTime: '13:00', endTime: '14:00', isAvailable: true },
    { id: '5', startTime: '14:00', endTime: '15:00', isAvailable: true },
    { id: '6', startTime: '15:00', endTime: '16:00', isAvailable: true },
  ];

  const handlePayment = async () => {
    if (!cardNumber.trim()) {
      toast.error('Please enter a card number');
      return;
    }
    setProcessing(true);
    try {
      await onBook(selectedDate, selectedSlot!.id);
      setStep('confirmed');
    } catch {
      toast.error('Booking failed');
    } finally {
      setProcessing(false);
    }
  };

  const steps = ['date', 'time', 'review', 'payment'] as const;
  const currentStepIndex = steps.indexOf(step as typeof steps[number]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Book Experience</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-all">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {step !== 'confirmed' && (
          <div className="px-6 pt-4">
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-full h-1 rounded-full ${
                      i <= currentStepIndex ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-6">
          {step === 'date' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Select Date
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {generateDates().map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-xl text-center border-2 transition-all ${
                      selectedDate === date
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-xs font-medium text-slate-500">
                      {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {new Date(date).getDate()}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(date).toLocaleDateString('en', { month: 'short' })}
                    </p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep('time')}
                disabled={!selectedDate}
                className="btn-primary w-full disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {step === 'time' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Select Time
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.isAvailable && setSelectedSlot(slot)}
                    disabled={!slot.isAvailable}
                    className={`p-3 rounded-xl text-center border-2 transition-all ${
                      !slot.isAvailable
                        ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                        : selectedSlot?.id === slot.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <p className="font-semibold text-sm">
                      {slot.startTime} - {slot.endTime}
                    </p>
                    {!slot.isAvailable && (
                      <p className="text-xs text-slate-400 mt-1">Unavailable</p>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('date')} className="btn-ghost flex-1">
                  Back
                </button>
                <button
                  onClick={() => setStep('review')}
                  disabled={!selectedSlot}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Review Booking</h3>
              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Experience</span>
                  <span className="text-sm font-medium text-slate-900">{experience.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Date</span>
                  <span className="text-sm font-medium text-slate-900">
                    {new Date(selectedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Time</span>
                  <span className="text-sm font-medium text-slate-900">
                    {selectedSlot?.startTime} - {selectedSlot?.endTime}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="text-sm font-semibold text-slate-900">Total</span>
                  <span className="text-lg font-bold text-indigo-600">
                    ${experience.price}
                  </span>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-700 font-medium">
                  Demo Payment - No real charges will be made
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('time')} className="btn-ghost flex-1">
                  Back
                </button>
                <button onClick={() => setStep('payment')} className="btn-primary flex-1">
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Demo Payment
              </h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                <p className="text-xs text-amber-700 font-medium">
                  This is a demo payment. No real charges will be processed. Use any card number.
                </p>
              </div>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card Number (any number)"
                className="input"
                maxLength={19}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="input"
                  maxLength={5}
                  defaultValue="12/28"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="input"
                  maxLength={3}
                  defaultValue="123"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('review')} className="btn-ghost flex-1">
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {processing ? 'Processing...' : `Pay $${experience.price}`}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
              <p className="text-sm text-slate-500 mb-6">
                Your booking for {experience.title} has been confirmed.
                <br />
                Date: {new Date(selectedDate).toLocaleDateString()} at {selectedSlot?.startTime}
              </p>
              <button onClick={onClose} className="btn-primary">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
