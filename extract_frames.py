import cv2
import numpy as np
import os

os.makedirs("public/frames", exist_ok=True)

cap = cv2.VideoCapture("public/character.mp4")

# Circular trajectory start: 22 (UP)
# End of full circle: 206 (almost UP-LEFT back to UP)
# Total frames in rotation: 64
start_frame = 22
end_frame = 206

# Linearly interpolate 64 frame indices between start_frame and end_frame
frame_indices = np.linspace(start_frame, end_frame, 64, endpoint=False)
frame_indices = [int(round(f)) for f in frame_indices]

print(f"Sampling 64 frames: {frame_indices}")

# Read and save each frame as WebP
for i, f_idx in enumerate(frame_indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
    ret, frame = cap.read()
    if not ret:
        print(f"Error reading frame {f_idx}")
        continue
    # Save high-quality WebP (quality 92 for crisp detail & fast loading)
    out_path = f"public/frames/frame_{i:02d}.webp"
    cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 92])

# Center neutral frame: Frame 235 or 238
cap.set(cv2.CAP_PROP_POS_FRAMES, 235)
ret, center_frame = cap.read()
if ret:
    cv2.imwrite("public/frames/center.webp", center_frame, [cv2.IMWRITE_WEBP_QUALITY, 92])
    print("Saved public/frames/center.webp")

cap.release()
print("All 64 frames and center.webp generated successfully!")
