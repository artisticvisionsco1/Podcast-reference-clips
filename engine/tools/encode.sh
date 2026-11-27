#!/bin/bash
# Two-pass x264 upload encode that fills the 100 MB budget (better detail than a one-pass fixed bitrate).
# usage: engine/tools/encode.sh <name>   (reads renders/<name>.mp4, writes it back)
set -e
v=$1; in=renders/$v.mp4; tmp=out/$v.upload.mp4; log=out/$v.x264
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
A=$(ffprobe -v error -select_streams a:0 -show_entries stream=bit_rate -of csv=p=0 "$in"); A=${A:-192000}
# 94 MB total, minus audio and ~1.5 % container overhead
VB=$(python3 -c "print(min(12000, int((94e6*8/$D - $A)/1000*0.985)))")
echo "encode $v: ${D}s video ${VB}k"
ffmpeg -nostdin -v error -y -i "$in" -c:v libx264 -preset slower -tune film -b:v ${VB}k -pass 1 -passlogfile $log -pix_fmt yuv420p -an -f mp4 /dev/null
ffmpeg -nostdin -v error -y -i "$in" -c:v libx264 -preset slower -tune film -b:v ${VB}k -maxrate $((VB*2))k -bufsize $((VB*3))k -pass 2 -passlogfile $log -pix_fmt yuv420p -c:a copy -movflags +faststart "$tmp"
rm -f $log*; mv "$tmp" "$in"; ls -la "$in"
