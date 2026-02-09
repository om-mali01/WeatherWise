import { motion } from 'framer-motion'

function Pulse({ className }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-white/10 ${className}`} />
  )
}

export default function LoadingSkeleton() {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-8 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Main card skeleton */}
      <div className="glass-strong rounded-3xl p-8 md:p-10 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <Pulse className="h-8 w-48" />
            <Pulse className="h-4 w-32" />
          </div>
          <Pulse className="h-20 w-20 rounded-full" />
        </div>
        <div className="flex items-end gap-4">
          <Pulse className="h-24 w-40" />
          <div className="space-y-2 mb-3">
            <Pulse className="h-4 w-24" />
            <Pulse className="h-4 w-20" />
          </div>
        </div>
        <Pulse className="h-14 w-full" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass rounded-2xl p-4 space-y-3 flex flex-col items-center">
            <Pulse className="h-5 w-5 rounded-full" />
            <Pulse className="h-3 w-16" />
            <Pulse className="h-5 w-12" />
          </div>
        ))}
      </div>

      {/* Forecast skeleton */}
      <div className="glass-strong rounded-3xl p-6">
        <Pulse className="h-4 w-32 mb-5" />
        <div className="grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3 py-4">
              <Pulse className="h-3 w-10" />
              <Pulse className="h-10 w-10 rounded-full" />
              <Pulse className="h-5 w-8" />
              <Pulse className="h-3 w-14" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
