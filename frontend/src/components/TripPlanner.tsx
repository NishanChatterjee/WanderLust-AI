import { MapPin, Calendar, Users, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface TripPlannerProps {
  destination: string;
  setDestination: (val: string) => void;
  dates: string;
  setDates: (val: string) => void;
  travelers: number;
  setTravelers: (val: number) => void;
}

export function TripPlanner({
  destination,
  setDestination,
  dates,
  setDates,
  travelers,
  setTravelers
}: TripPlannerProps) {
  return (
    <Card className="h-full w-80 shrink-0 flex flex-col p-6 rounded-none border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white mb-2">
          <Sparkles className="text-purple-500 fill-purple-500/20" /> WanderLust
        </h1>
        <p className="text-sm text-slate-400">AI-Powered Travel Orchestrator</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Where to?</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <Input 
              className="pl-10 bg-slate-800/50 border-slate-700/50" 
              placeholder="Paris, Tokyo, Mars..." 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Dates</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <Input 
              type="date"
              className="pl-10 bg-slate-800/50 border-slate-700/50" 
              value={dates}
              onChange={(e) => setDates(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
           <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Travelers</label>
           <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
              <Input 
                type="number"
                min={1}
                className="pl-10 bg-slate-800/50 border-slate-700/50" 
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
              />
           </div>
        </div>

        <Button className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-900/20">
          Update Preferences
        </Button>
      </div>

      <div className="mt-auto space-y-4 pt-6 border-t border-slate-800/50">
         <div className="rounded-xl bg-slate-800/30 p-4">
             <h3 className="text-sm font-medium text-slate-200 mb-1">Trip Status</h3>
             <div className="flex items-center gap-2 text-xs text-yellow-500">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                 </span>
                 Planning Phase
             </div>
         </div>
         <div className="text-center text-xs text-slate-600">
             v2.0 • Resilient Backend
         </div>
      </div>
    </Card>
  );
}
