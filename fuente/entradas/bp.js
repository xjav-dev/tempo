import * as tf from '@spotify/basic-pitch/node_modules/@tensorflow/tfjs';
import { BasicPitch, outputToNotesPoly, addPitchBendsToNoteEvents, noteFramesToTime } from '@spotify/basic-pitch';
import modelJson from '@spotify/basic-pitch/model/model.json';
import weights from '@spotify/basic-pitch/model/group1-shard1of1.bin';
function loadModel(){
  const w = weights.slice().buffer;
  return tf.loadGraphModel(tf.io.fromMemory({
    modelTopology: modelJson.modelTopology,
    weightSpecs: modelJson.weightsManifest[0].weights,
    weightData: w,
    format: modelJson.format, generatedBy: modelJson.generatedBy, convertedBy: modelJson.convertedBy,
    signature: modelJson.signature, userDefinedMetadata: modelJson.userDefinedMetadata
  }));
}
window.TSBP = { BasicPitch, outputToNotesPoly, addPitchBendsToNoteEvents, noteFramesToTime, loadModel };
