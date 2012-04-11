" Prevent vim from trying to connect to the X server when connecting
" from home, which causes a startup delay of about 14 seconds. I
" usually connect from home via screen.
"
set clipboard=autoselect,exclude:cons\\\|linux\\\|screen
filetype off

set rtp+=~/.vim/bundle/vundle/
call vundle#rc()

" let Vundle manage Vundle 
"  git clone http://github.com/gmarik/vundle.git ~/.vim/bundle/vundle
" required! 
Bundle 'gmarik/vundle'

" My Bundles here:
" original repos on github
"Bundle 'tpope/vim-fugitive'
Bundle 'Lokaltog/vim-easymotion'
" vim-scripts repos
Bundle 'L9'
Bundle 'FuzzyFinder'
Bundle 'NERD_tree-Project'
Bundle 'SuperTab'
Bundle 'surround.vim'
Bundle 'ZoomWin'
Bundle 'Syntastic'
Bundle 'vim-indent-object'
"Bundle 'Tagbar'
"Bundle 'git://github.com/dickeytk/status.vim.git'
Bundle 'unimpaired.vim'
Bundle 'The-NERD-tree'
Bundle 'The-NERD-Commenter'
Bundle 'vim-coffee-script'
Bundle 'Sass'
Bundle 'Markdown'
Bundle 'jQuery'

" explicit github repos
Bundle 'git://github.com/tpope/vim-rails.git'
Bundle 'git://github.com/tpope/vim-fugitive.git'
Bundle 'git://github.com/gregsexton/gitv.git'
Bundle 'git://github.com/tpope/vim-abolish.git'
Bundle 'git://github.com/nelstrom/vim-textobj-rubyblock.git'
Bundle 'git://github.com/kana/vim-textobj-user.git'
Bundle 'git://git.wincent.com/command-t.git'
"Bundle 'git://github.com/Lokaltog/vim-superstatus.git'
Bundle 'https://github.com/Lokaltog/vim-powerline'
Bundle 'git://github.com/pangloss/vim-javascript.git'
Bundle 'git://github.com/tpope/vim-haml'
Bundle 'git://github.com/nathanaelkane/vim-indent-guides.git'
Bundle 'git://github.com/kien/ctrlp.vim'
Bundle 'git://github.com/vim-scripts/Color-Sampler-Pack.git'
Bundle 'git://github.com/tpope/vim-markdown.git'
Bundle 'git://github.com/juvenn/mustache.vim.git'
Bundle 'git://github.com/briancollins/vim-jst.git'
Bundle 'git://github.com/mileszs/ack.vim.git'
" ...

filetype plugin indent on     " required! 

set nocompatible
set title
set number
set ruler
syntax on
set history=1000
set visualbell
" Set encoding
set encoding=utf-8
" Whitespace stuff
set nowrap
set tabstop=2
set shiftwidth=2
set softtabstop=2
set expandtab
set list listchars=tab:\ \ ,trail:·

" Searching
set hlsearch
set incsearch
" Toggle on/off showing whitespace
nmap <silent> <leader>s :silent :nohlsearch<CR>

set ignorecase
set smartcase

" Change the ! to override to a confirm dialog
set confirm
" Tab completion
set wildmode=list:longest,list:full
set wildignore+=*.o,*.obj,.git,*.rbc,*.class,.svn,test/fixtures/*,vendor/gems/*

" Status bar
set laststatus=2

let mapleader = ","
" Without setting this, ZoomWin restores windows in a way that causes
" equalalways behavior to be triggered the next time CommandT is used.
" This is likely a bludgeon to solve some other issue, but it works
set noequalalways

" NERDTree configuration
let NERDTreeIgnore=['\.rbc$', '\~$']
map <Leader>n :NERDTreeToggle<CR>


" Map F5 to a buffers list
":nnoremap <F5> :buffers<CR>:buffer<Space>
set wildchar=<Tab> wildmenu wildmode=full
set wildcharm=<C-Z>
nnoremap <F10> :b <C-Z>

" Command-T configuration
let g:CommandTMaxHeight=20
set wildignore+=*.o,*.obj,.git,*.pyc
noremap <leader>t :CommandT<cr>
noremap <leader>y :CommandTFlush<cr>

" bufExplorer configuration
let g:bufExplorerDefaultHelp=0
let g:bufExplorerShowRelativePath=1
map <leader>b :BufExplorer<cr>

map <leader>a :Ack<cr>
" let g:ackprg="ack-grep -H --nocolor --nogroup --column"

" ZoomWin configuration
map <Leader><Leader> :ZoomWin<CR>

" CTags
map <Leader>rt :!ctags --extra=+f -R *<CR><CR>
" Make the taglist show up on the right
let Tlist_Use_Right_Window   = 1


" Remember last location in file
if has("autocmd")
  au BufReadPost * if line("'\"") > 0 && line("'\"") <= line("$")
    \| exe "normal g'\"" | endif
endif

function s:setupWrapping()
  set wrap
  set wm=2
  set textwidth=72
endfunction

function s:setupMarkup()
  call s:setupWrapping()
  map <buffer> <Leader>p :Mm <CR>
endfunction

" make uses real tabs
au FileType make                                     set noexpandtab

" Thorfile, Rakefile, Vagrantfile and Gemfile are Ruby
au BufRead,BufNewFile {Gemfile,Rakefile,Vagrantfile,Thorfile,config.ru}    set ft=ruby

" md, markdown, and mk are markdown and define buffer-local preview
au BufRead,BufNewFile *.{md,markdown,mdown,mkd,mkdn} call s:setupMarkup()

au BufRead,BufNewFile *.txt call s:setupWrapping()

" make python follow PEP8 ( http://www.python.org/dev/peps/pep-0008/ )
au FileType python  set tabstop=4 textwidth=79

" allow backspacing over everything in insert mode
set backspace=indent,eol,start

" load the plugin and indent settings for the detected filetype
filetype plugin indent on

" Opens an edit command with the path of the currently edited file filled in
" Normal mode: <Leader>e
map <Leader>e :e <C-R>=expand("%:p:h") . "/" <CR>

" Opens a tab edit command with the path of the currently edited file filled in
" Normal mode: <Leader>t
map <Leader>te :tabe <C-R>=expand("%:p:h") . "/" <CR>

" Inserts the path of the currently edited file into a command
" Command mode: Ctrl+P
cmap <C-P> <C-R>=expand("%:p:h") . "/" <CR>

map <silent> <F5> mmgg=G
map <silent> <F5> <Esc> mmgg=G

" Unimpaired configuration
" Bubble single lines
nmap <C-Up> [e
nmap <C-Down> ]e
" Bubble multiple lines
vmap <C-Up> [egv
vmap <C-Down> ]egv

" Map W to w since it's a common typo
command! W :w


" CTRL-Tab is Next window
noremap <C-Tab> <C-W>w
inoremap <C-Tab> <C-O><C-W>w
cnoremap <C-Tab> <C-C><C-W>w
onoremap <C-Tab> <C-C><C-W>w

" Unbind the cursor keys in insert, normal and visual modes.
"for prefix in ['i', 'n', 'v']
"  for key in ['<Up>', '<Down>', '<Left>', '<Right>']
"    exe prefix . "noremap " . key . " <Nop>"
"  endfor
"endfor

" Map ctrl-movement keys to control-w movement
map <c-j> <c-w>j
map <c-k> <c-w>k
map <c-l> <c-w>l
map <c-h> <c-w>h

" Enable syntastic syntax checking
let g:syntastic_enable_signs=1
let g:syntastic_quiet_warnings=1

" gist-vim defaults
if has("mac")
  let g:gist_clip_command = 'pbcopy'
elseif has("unix")
  let g:gist_clip_command = 'xclip -selection clipboard'
endif
let g:gist_detect_filetype = 1
let g:gist_open_browser_after_post = 1

" Use modeline overrides
set modeline
set modelines=10

" Remap backtick to Esc
:imap ` <Esc>
" Map double-tap Esc to clear search highlights
nnoremap <silent> <Esc><Esc> <Esc>:nohlsearch<CR><Esc>
" Set color mode for 256colors
set t_Co=256
" Default color scheme
color jellybeans

" Define some default colors for the indent guide for terminal based vim
hi IndentGuidesOdd  ctermbg=grey
hi IndentGuidesEven ctermbg=darkgrey

hi IndentGuidesOdd  ctermbg=grey
hi IndentGuidesEven ctermbg=darkgrey

" Let VIM handle multiple buffers nicely
set hidden

" Directories for swp files
set backupdir=~/.vim/backup
set directory=~/.vim/backup

" Turn off jslint errors by default
let g:JSLintHighlightErrorLine = 0

" MacVIM shift+arrow-keys behavior (required in .vimrc)
let macvim_hig_shift_movement = 1

" % to bounce from do to end etc. Required for vim-textob-rubyblock
runtime! macros/matchit.vim

" Include user's local vim config
if filereadable(expand("~/.vimrc.local"))
  source ~/.vimrc.local
endif
