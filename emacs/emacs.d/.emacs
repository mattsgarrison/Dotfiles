(require 'linum)
(global-linum-mode t)
(setq linum-format "%2d ")

(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(custom-enabled-themes (quote (wombat)))
 '(custom-safe-themes (quote ("1e7e097ec8cb1f8c3a912d7e1e0331caeed49fef6cff220be63bd2a6ba4cc365" default)))
 '(menu-bar-mode t))

(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
 ;; arg >= 1 enable the menu bar. Menu bar is the File, Edit, Options,
 ;; Buffers, Tools, Emacs-List, Help

;(set-default-font "DejaVu Sans Mono-12")
;(set-default-font "Inconsolata-15")
(set-default-font "Monospace-11")
;(set-default-font "Monaco-14:width=condensed")

; Custom Theme Load Path
;(add-to-list 'custom-theme-load-path "~/.emacs.d/themes/emacs-color-theme-solarized")
;(load-theme 'solarized-dark t)

; Kill the welcome buffer
(setq inhibit-startup-message t)

; Disable the menu bar and the tool bar
;(menu-bar-mode 0)
(tool-bar-mode 0)

; Show matching parans
(show-paren-mode 1)

; Use spaces instead of tabs for indentation
(setq indent-tabs-mode nil)

; Turn on Syntax highlighting
(global-font-lock-mode t)
(load-library "font-lock")
(setq font-lock-maximum-decoration t)

; Set backup directory location
(setq backup-directory-alist '(("." . "~/.emacs.d/saves/")))

;Make backups by copying
(setq backup-by-copying-when-linked t)

(setq delete-old-versions t
      kept-new-versions 6
      kept-old-versions 2
      version-control t)
                        
; No easy way to jump to matching parenthesis, so we make a mapping!
; Just like in vim, we use the % sign to jump to matching paren.
(global-set-key "%" 'match-paren)

(defun match-paren (arg)
 "Go to the matching paren if on a paren; otherwise, insert %."
(interactive "p")
(cond ((looking-at "\\s\(") (forward-list 1) (backward-char 1))
      ((looking-at "\\s\)") (forward-char 1) (backward-list 1))
      (t (self-insert-command (or arg 1)))))

; Map <C-j> to Return for auto-indent
(define-key global-map (kbd "RET") 'newline-and-indent)

; Load Packages
; Geiser, Quack, ParEdit
(load-file "~/.emacs.d/packages/geiser/elisp/geiser.el")
(load-file "~/.emacs.d/packages/quack.el")
(load-file "~/.emacs.d/packages/paredit.el")

; Autoload the ParEdit mode with Emacs' Lisp modes
(autoload 'paredit-mode "paredit"
  "Minor mode for pseudo-structurally editing Lisp code." t)
(add-hook 'emacs-lisp-mode-hook       (lambda () (paredit-mode +1)))
(add-hook 'lisp-mode-hook             (lambda () (paredit-mode +1)))
(add-hook 'lisp-interaction-mode-hook (lambda () (paredit-mode +1)))
(add-hook 'scheme-mode-hook           (lambda () (paredit-mode +1)))

