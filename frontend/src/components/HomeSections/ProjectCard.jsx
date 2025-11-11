import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const THEME_TRANSITION = "background 600ms ease, background-color 600ms ease, color 600ms ease, border-color 600ms ease";

const withTransition = (style) => ({
  transition: THEME_TRANSITION,
  ...(style || {}),
});

export default function ProjectCard({ project, index, palette, buttonPalette }) {
  const [showMedia, setShowMedia] = useState(false);

  const cardStyle = palette
    ? withTransition({
        background: palette.bg,
        borderColor: palette.border,
        color: palette.text,
      })
    : undefined;
  const headerStyle = palette?.text ? { color: palette.text } : undefined;
  const mutedStyle = palette?.muted ? { color: palette.muted } : undefined;

  const primaryButtonStyle = buttonPalette?.bg
    ? {
        backgroundColor: buttonPalette.bg,
        color: buttonPalette.text,
        borderColor: buttonPalette.bg,
        transition: 'all 250ms ease',
      }
    : undefined;
  const secondaryButtonStyle = buttonPalette?.hover
    ? {
        backgroundColor: buttonPalette.hover,
        color: buttonPalette.text,
        borderColor: buttonPalette.hover,
        transition: 'all 250ms ease',
      }
    : undefined;
  const headerFallbackClass = headerStyle ? '' : 'text-[#2C2C2C]';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={`group rounded-2xl overflow-hidden transition-all duration-500 border ${cardStyle ? '' : 'bg-white border-[#E8DCC4]'}`}
        style={cardStyle}
      >
        <div
          className={`relative h-56 overflow-hidden cursor-pointer ${palette?.mediaBg ? '' : 'bg-gradient-to-br from-[#A8B8A0] to-[#D4A5A5]'}`}
          onClick={() => setShowMedia(true)}
          style={palette?.mediaBg ? withTransition({ background: palette.mediaBg }) : undefined}
        >
          {project.thumbnail ? (
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-white opacity-30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
            <span className="text-white text-sm font-serif">View Media</span>
          </div>
        </div>

        <div className="p-8">
          <h3
            className="text-2xl font-accent font-medium mb-3 transition-colors"
            style={headerStyle}
          >
            {project.title}
          </h3>
          <p
            className="leading-relaxed mb-6 font-serifalt"
            style={mutedStyle}
          >
            {project.description}
          </p>

          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font- tracking-wide"
                style={primaryButtonStyle}
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-accent tracking-wide"
                style={secondaryButtonStyle || primaryButtonStyle}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog open={showMedia} onOpenChange={setShowMedia}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle
              className={`text-2xl font-heading font-light ${headerFallbackClass}`}
              style={headerStyle}
            >
              {project.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {project.media && project.media.length > 0 ? (
              <div className="grid gap-4">
                {project.media.map((mediaUrl, idx) => (
                  <img 
                    key={idx}
                    src={mediaUrl} 
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div
                className={`h-96 rounded-lg flex items-center justify-center ${palette?.mediaBg ? '' : 'bg-gradient-to-br from-[#A8B8A0] to-[#D4A5A5]'}`}
                style={palette?.mediaBg ? withTransition({ background: palette.mediaBg }) : undefined}
              >
                <p className="text-white text-lg font-body">No media available</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
