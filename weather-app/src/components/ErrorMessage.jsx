import { motion } from 'framer-motion'
import { FiAlertCircle, FiX } from 'react-icons/fi'

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-6"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-red-500/15 border border-red-500/20 backdrop-blur-xl">
        <FiAlertCircle className="text-red-400 text-xl flex-shrink-0" />
        <span className="text-red-200 text-sm font-medium flex-1">{message}</span>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400/60 hover:text-red-300 transition-colors"
          >
            <FiX />
          </button>
        )}
      </div>
    </motion.div>
  )
}
