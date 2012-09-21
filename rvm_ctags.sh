#! /bin/sh
# tags default ruby and associated gems

SRC="${rvm_path}/rubies/default"
echo "SRC: ${SRC}"

GEMS=`rvm gemdir`/gems
echo "GEMS: ${GEMS}"

DEST=~/.vim/tags/ruby_and_gems
echo "DEST: ${DEST}"
mkdir -p $(dirname $DEST)
rm $DEST

ctags \
 --exclude=.git \
 --exclude=tags \
 --exclude=logs \
 --exclude=doc \
 -R -f $DEST $SRC $GEMS
